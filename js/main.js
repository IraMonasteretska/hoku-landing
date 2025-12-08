$(document).ready(function () {
  // animation aos 
  AOS.init({
    disable: 'phone',
    duration: 1000,
  });

  $(window).on('scroll load', function () {
    if ($(this).scrollTop() > 10) {
      $('.header').addClass('scroll');
    } else {
      $('.header').removeClass('scroll');
    }
  });

  $('.header.header .menu').on('click', function () {
    $('body').toggleClass('hidden');
    $('body').toggleClass('blur');
    $('.header.header').toggleClass('open');

  })

  $(".menuwrapper a").on("click", function (e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top
    }, 777);
    e.preventDefault();
    return false;
  });

  $('.menuwrapper a').on('click', function () {
    $('body').removeClass('hidden');
    $('body').removeClass('blur');
    $('.header.header').removeClass('open');
  });





  const header = document.querySelector('.header');
  const menuButton = document.querySelector('.menu');
  const iconWhite = document.querySelector('.icon-white');
  const iconBlue = document.querySelector('.icon-blue');
  const blocks = document.querySelectorAll('.block');

  // Обробка кліку на кнопку меню
  menuButton.addEventListener('click', () => {
    header.classList.toggle('active');
    updateIcons(); // Оновлюємо іконки після зміни стану
  });

  function updateIcons() {
    const isMenuActive = header.classList.contains('active');

    // Якщо меню активне - завжди показуємо синю іконку
    if (isMenuActive) {
      iconWhite.style.display = 'none';
      iconBlue.style.display = 'block';
      iconBlue.style.clipPath = 'none';
      return;
    }

    // Якщо меню неактивне - працює логіка обрізання залежно від блоків
    const menuRect = menuButton.getBoundingClientRect();
    const menuTop = menuRect.top;
    const menuBottom = menuRect.bottom;
    const menuHeight = menuRect.height;

    const whiteRanges = [];
    const blueRanges = [];

    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();

      if (rect.bottom > menuTop && rect.top < menuBottom) {
        const visibleTop = Math.max(0, rect.top - menuTop);
        const visibleBottom = Math.min(menuHeight, rect.bottom - menuTop);

        if (block.classList.contains('block1')) {
          whiteRanges.push({ start: visibleTop, end: visibleBottom });
        } else if (block.classList.contains('block2')) {
          blueRanges.push({ start: visibleTop, end: visibleBottom });
        }
      }
    });

    if (whiteRanges.length > 0) {
      iconWhite.style.clipPath = createClipPath(whiteRanges, menuHeight);
      iconWhite.style.display = 'block';
    } else {
      iconWhite.style.display = 'none';
    }

    if (blueRanges.length > 0) {
      iconBlue.style.clipPath = createClipPath(blueRanges, menuHeight);
      iconBlue.style.display = 'block';
    } else {
      iconBlue.style.display = 'none';
    }
  }

  function createClipPath(ranges, height) {
    ranges.sort((a, b) => a.start - b.start);
    const merged = [];

    for (let range of ranges) {
      if (merged.length === 0) {
        merged.push({ ...range });
      } else {
        const last = merged[merged.length - 1];
        if (range.start <= last.end) {
          last.end = Math.max(last.end, range.end);
        } else {
          merged.push({ ...range });
        }
      }
    }

    const polygonPoints = [];

    for (let range of merged) {
      const startPercent = (range.start / height) * 100;
      const endPercent = (range.end / height) * 100;

      polygonPoints.push(`0% ${startPercent}%`);
      polygonPoints.push(`100% ${startPercent}%`);
      polygonPoints.push(`100% ${endPercent}%`);
      polygonPoints.push(`0% ${endPercent}%`);
    }

    return `polygon(evenodd, ${polygonPoints.join(', ')})`;
  }

  window.addEventListener('scroll', updateIcons, { passive: true });
  window.addEventListener('resize', updateIcons);

  updateIcons();







})