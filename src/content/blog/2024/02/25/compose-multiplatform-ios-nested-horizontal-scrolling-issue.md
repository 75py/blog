---
title: 'Compose Multiplatform for iOSにおける横スクロールのネスト不具合'
description: ''
pubDate: '2024-02-25'
heroImage: '../../../../../images/categories/programming.png'
tags:
  - iOS
  - Compose Multiplatform
  - Kotlin Multiplatform
---

作成済みのissue [iOS: TabView > UITableViewController > UIHostingController > Compose Configuration Causes Recompose and Horizontal Scroll Issues](https://github.com/JetBrains/compose-multiplatform/issues/3879) に関する調査ログ。

## 不具合の概要

iOS側でTabViewの中にUITableViewControllerを配置し、その中にUIHostingControllerを配置し、その中にComposeViewを配置した場合、横スクロールが正常に動作しない。

そもそも作りが、という話はあるがそこは割愛。歴史があればそういうこともある。

### ソースコード

#### shared commonMain Views.kt

「Text {rowId}」というボタンが20個並ぶ横スクロールのRowを作成する。タップすると「Clicked {rowId}」に変わる。

```kotlin
@Composable
fun HorizontalScrollRow(rowIds: List<Int> = IntRange(0, 20).toList()) {
    LazyRow(
        modifier = Modifier
            .padding(16.dp)
            .width(300.dp)
            .height(100.dp)
    ) {
        items(
            items = rowIds,
            key = { rowId -> rowId }
        ) { rowId ->
            var text by remember { mutableStateOf("Text $rowId") }
            Button(onClick = {
                text = "Clicked $rowId"
            }) {
                Text(text)
            }
        }
    }
}
```

#### shared iosMain Platform.ios.kt

ComposeUIViewControllerでHorizontalScrollRowをラップする。

```kotlin
import androidx.compose.ui.window.ComposeUIViewController

fun HorizontalScrollRowViewController() = ComposeUIViewController { HorizontalScrollRow() }
```

#### iosApp ContentView.swift

TabViewの中にTableViewControllerWrapperを3つ配置する。  
TableViewControllerWrapperはCustomTableViewControllerをラップする。
CustomTableViewControllerはUITableViewを持ち、19番目のセルにHorizontalScrollRowViewControllerWrapperを表示する。

```swift
import SwiftUI
import shared
import UIKit

class CustomTableViewController: UITableViewController {
    
    private let numOfRows = 100
    private let sharedViewIndex = 19
    private let sharedViewIdentifier = "shared_cell"
    private var cachedHostingControllers: [Int: UIHostingController<HorizontalScrollRowViewControllerWrapper>] = [:]

    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: sharedViewIdentifier)
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return numOfRows
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        // {sharedViewIndex}番目のセルにHorizontalScrollRowViewControllerWrapperを表示
        if indexPath.row == sharedViewIndex {
            let cell = tableView.dequeueReusableCell(withIdentifier: sharedViewIdentifier, for: indexPath)
            let cachedVC = cachedHostingControllers[indexPath.row]
            if cachedVC == nil {
                let hostVC = UIHostingController(rootView: HorizontalScrollRowViewControllerWrapper())
                cachedHostingControllers[indexPath.row] = hostVC
                
                self.addChild(hostVC)
                hostVC.didMove(toParent: self)
                
                hostVC.view.frame = cell.contentView.bounds
                hostVC.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                
                cell.contentView.addSubview(hostVC.view)
            }
            return cell
        } else {
            let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
            cell.textLabel?.text = "Row \(indexPath.row + 1)"
            
            return cell
        }
    }
    
    override func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80
    }
}

struct TableViewControllerWrapper: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> CustomTableViewController {
        return CustomTableViewController()
    }
    
    func updateUIViewController(_ uiViewController: CustomTableViewController, context: Context) {
    }
}

struct ContentView: View {
    var body: some View {
        TabView {
            TableViewControllerWrapper()
            TableViewControllerWrapper()
            TableViewControllerWrapper()
        }.tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

struct HorizontalScrollRowViewControllerWrapper: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        return Platform_iosKt.HorizontalScrollRowViewController()
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {
    }
}
```

## ソースコード調査

- ComposeUIViewControllerとは？
  - https://github.com/JetBrains/compose-multiplatform-core/blob/5b153cc581f7b5cba89a5a406c33d71fcbc404d4/compose/ui/ui/src/uikitMain/kotlin/androidx/compose/ui/window/ComposeUIViewController.uikit.kt
  - 実体は ComposeContainer 。ラップしているだけ

- ComposeContainerとは？
  - https://github.com/JetBrains/compose-multiplatform-core/blob/09c5188413bdf1f8625fdd36b4c7aa9653a60d5c/compose/ui/ui/src/uikitMain/kotlin/androidx/compose/ui/window/ComposeContainer.uikit.kt#
  - CMPViewController を継承している
  - いったん CMPViewController から先に読んでみるか。。。

- CMPViewControllerとは？
  - https://github.com/JetBrains/compose-multiplatform-core/blob/de0d28de54f0e9fec6877f1c017d66edffe72e36/compose/ui/ui-uikit/src/uikitMain/objc/CMPUIKitUtils/CMPUIKitUtils/CMPViewController.m
  - まさかのObjective-C・・・
  - cmp_isRootViewController
    - 自分がウィンドウのルートVCかを判定する（ルートならYesを返す）
  - cmp_isInWindowHierarchy
    - 自分がウィンドウ階層に含まれているかを再帰的に（親VCとか自分を表示しているVCをたどって）判定する（含まれているならYesを返す）
  - CMPViewControllerLifecycleState
    - VCのライフサイクルを表す列挙型っぽい
    - Initialized, Started, Destroyed の3つ
  - CMPViewController は UIViewController を継承している
    - _lifecycleState というプロパティでenumを保持してライフサイクルを管理している
    - initWithNibName:bundle: メソッドで初期化する際に lifecycleState を Initialized にする
    - viewWillAppeared メソッドで lifecycleState を Started にする
      - viewControllerDidEnterWindowHierarchy
        - transitLifecycleToStarted
          - _lifecycleState が Destroyed なら例外をスロー
          - _lifecycleState が Initialized なら Started に変更
            - viewControllerDidEnterWindowHierarchy
              - transitLifecycleToStarted （なんでこれもう一度呼ぶんだ？）
            - scheduleHierarchyContainmentCheck
              - 0.5秒待つ
              - _lifecycleState が Initialized、Destroyedならassert(false) （これどう解釈すればいい？）
              - _lifecycleState が Started なら
                - cmp_isInWindowHierarchy が Yesなら scheduleHierarchyContainmentCheck
                - cmp_isInWindowHierarchy が Noなら
                  - _lifecycleState を Destroyed に変更
                  - viewControllerDidLeaveWindowHierarchy
                    - 何もしない
          - _lifecycleState が Started なら何もしない
  - こうして整理してみると、ライフサイクル周りはちょっと怪しい気もする
  - が、今回の不具合の場合、タップはきちんと効いているので、CMPViewController自体が原因というわけではなさそう
    - ※ 1.5.3ではタップもきちんと動作しなかったが、1.6.0-beta01では改善している（issue参照）

- 改めて ComposeContainer を読む
  - 疲れたので割愛
  - ジェスチャーイベントをハンドリングするような記述はない
  - 強いて言えば viewWillLayoutSubviews や viewDidLayoutSubviews で再計算をしているはずなので、そこで何かが起きているのかもしれない
  - これ以上はデバッグしてみないと分からないな。。。

そのうち続く・・・
