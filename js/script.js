$(function () {
  var navHeight = $(".header").outerHeight();

  // ページ内スクロール（同じページ内のリンクのみ対応）
  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);

    if (target.length) {  // ターゲット要素があるか確認
      var position = target.offset().top - navHeight;
      $("html, body").animate({ scrollTop: position }, 300, "swing");
      return false;  // ページ遷移キャンセル
    }
  });

  // ページトップボタン
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0 }, 300);
    return false;
  });

  // スマホ用ナビ開閉
  $('#menu-sp').on('click', function () {
    $('#nav-sp').stop().slideToggle(300);
  });

  // メニュー内リンクをクリックしたらメニューを閉じる＆ページ遷移処理
  $('#nav-sp a').on('click', function (e) {
    var href = $(this).attr('href');

    // 外部ページや別ページのリンクは、メニュー閉じてから遷移
    if (href.indexOf('index.html') === 0 || href.indexOf('http') === 0) {
      e.preventDefault();
      $('#nav-sp').slideUp(300);
      setTimeout(function () {
        window.location.href = href;
      }, 300);
      return;
    }

    // 同じページ内リンクの場合はスムーズスクロール（上の処理と重複防止）
    if (href.indexOf('#') === 0) {
      var target = $(href);
      if (target.length) {
        e.preventDefault();
        $('#nav-sp').slideUp(300);
        var position = target.offset().top - navHeight;
        $('html, body').animate({ scrollTop: position }, 300, 'swing');
      }
    }
  });
});
