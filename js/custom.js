// 最简单的实现方案
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      var path = window.location.pathname;
      var isHome = path === '/' || path === '/index.html' || path === '/index' || path.startsWith('/page/');
    
      if (!isHome) return;
      var subtitleElement = document.getElementById('subtitle');
      
      if (!subtitleElement) return;
      
      var texts = [
        "Hello World",
        "你好世界", 
        "こんにちは世界",
        "안녕하세요 세계",
        "Welcome to My Blog"
      ];
      
      // 当前显示索引
      var currentIndex = 0;
      
      // 打字机效果函数
      function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
          subtitleElement.innerHTML = text.substring(0, i+1) + '<span aria-hidden="true"></span>';
          
          setTimeout(function() {
            typeWriter(text, i + 1, fnCallback);
          }, 100);
        } else if (typeof fnCallback == 'function') {
          setTimeout(fnCallback, 2000);
        }
      }
      
      // 开始打字机效果
      function startTyping() {
        var text = texts[currentIndex];
        subtitleElement.innerHTML = '';
        typeWriter(text, 0, function() {
          // 打字完成后，选择下一个文本
          currentIndex = (currentIndex + 1) % texts.length;
          // 延迟后开始下一次打字
          setTimeout(startTyping, 1000);
        });
      }
      
      // 随机选择起始文本
      currentIndex = Math.floor(Math.random() * texts.length);
      
      // 开始循环打字
      startTyping();
    }, 1000);
  });
})();