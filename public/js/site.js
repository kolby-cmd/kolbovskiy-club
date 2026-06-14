(function(){
      const body = document.body;
      const menuBtn = document.getElementById('menuToggle');
      const menuLinks = document.querySelectorAll('.mobile-panel a');
      const searchOpen = document.getElementById('searchOpen');
      const mobileSearchOpen = document.getElementById('mobileSearchOpen');
      const searchClose = document.getElementById('searchClose');
      const searchInput = document.getElementById('searchInput');

      function closeMenu(){ body.classList.remove('menu-open'); }
      function openSearch(event){
        if(event) event.preventDefault();
        closeMenu();
        body.classList.add('search-open');
        window.setTimeout(() => searchInput && searchInput.focus(), 60);
      }
      function closeSearch(){ body.classList.remove('search-open'); }

      if(menuBtn){ menuBtn.addEventListener('click', () => body.classList.toggle('menu-open')); }
      menuLinks.forEach(link => link.addEventListener('click', closeMenu));
      if(searchOpen){ searchOpen.addEventListener('click', openSearch); }
      if(mobileSearchOpen){ mobileSearchOpen.addEventListener('click', openSearch); }
      if(searchClose){ searchClose.addEventListener('click', closeSearch); }
      window.addEventListener('keydown', event => {
        if(event.key === 'Escape'){
          closeMenu();
          closeSearch();
        }
      });
    })();
