/*---------------------------------
// tab
---------------------------------*/
$(function () {
  // 内部タブの初期化関数
  function initializeInnerTabs($container) {
    var $innerContainer = $container.find('.js-tab-container'); // 内部タブコンテナを検索
    $innerContainer.each(function () {
      var $innerTabContainer = $(this);
      $innerTabContainer.find('.js-tab').removeClass('active'); // 内部タブのアクティブをリセット
      $innerTabContainer.find('.js-tab-box').hide(); // 内部タブのコンテンツを非表示
      $innerTabContainer.find('.js-tab').first().addClass('active'); // 最初の内部タブをアクティブに
      $innerTabContainer.find('.js-tab-box').first().show(); // 最初の内部タブコンテンツを表示
    });
  }

  // タブクリック時の処理
  $('.js-tab').click(function () {
    var $this = $(this);
    var $container = $this.closest('.js-tab-container'); // クリックされたタブの直近のコンテナを取得
    var tabID = $this.data('tab'); // 対応するタブIDを取得

    // 現在のタブコンテナ内でのみ処理
    $container.find('.js-tab').removeClass('active'); // すべてのタブからアクティブを削除
    $this.addClass('active'); // クリックされたタブをアクティブに

    $container.find('.js-tab-box').hide(); // 全てのコンテンツを非表示
    var $targetContent = $container.find('.js-tab-box[data-tab-content="' + tabID + '"]');
    $targetContent.show(); // 対応するコンテンツを表示

    // 内部タブの初期化
    initializeInnerTabs($targetContent);
  });

  // ページロード時の初期化処理
  $('.js-tab-container').each(function () {
    var $container = $(this);
    $container.find('.js-tab-box').hide(); // 全て非表示
    $container.find('.js-tab-box').first().show(); // 最初のタブコンテンツを表示
    $container.find('.js-tab').first().addClass('active'); // 最初のタブをアクティブに

    // 内部タブの初期化
    initializeInnerTabs($container);
  });
});

/*---------------------------------
// アコーディオン
---------------------------------*/
$(function () {
  $('.js-accordion-content').hide();
  $('.js-accordion').on('click', function () {
    const $this = $(this);
    const $content = $this.next('.js-accordion-content');
    // アニメーション中は何もしない
    if ($content.is(':animated')) return;

    $content.slideToggle();
    $this.toggleClass('active');

    const $text = $this.find('.icon-accordion');
    if ($this.hasClass('active')) {
      $text.text('詳細情報を閉じる');
    } else {
      $text.text('詳細情報を開く');
    }
  });
});

/*---------------------------------
// ローディングアニメーション
---------------------------------*/
// ドット表示要素の取得
document.addEventListener("DOMContentLoaded", function () {
  var dotsElements = document.querySelectorAll(".loading-dots");
  dotsElements.forEach(function (dotsElement) {
    var dotCount = 0;
    // 500msごとにドットを更新
    setInterval(function () {
      // display: noneの場合はスキップ
      if (dotsElement.closest(".loading").style.display === "none") {
        return;
      }
      dotCount = (dotCount + 1) % 4; // 0, 1, 2, 3の繰り返し
      dotsElement.innerText = ". ".repeat(dotCount); // repeatStringを.repeatに置き換え
    }, 500);
  });
});