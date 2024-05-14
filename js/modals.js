class Modal {
  constructor(props) {
    let defaultConfig = {
      linkAttributeName: 'modal',
    };
    this.config = Object.assign(defaultConfig, props);

    this.init();
  }

  static _shadow = false;

  init() {
    this.isOpened = false;
    this.openedWindow = false;
    this._modalBlock = false;
    (this.starter = false), (this._nextWindows = false);
    this._scrollPosition = 0;

    if (!Modal._shadow) {
      Modal._shadow = document.createElement('div');
      Modal._shadow.classList.add('modal__shadow');
      document.body.appendChild(Modal._shadow);
    }

    this.eventsFeeler();
  }

  eventsFeeler() {
    document.addEventListener(
      'click',
      function (e) {
        const clickedlink = e.target.closest(
          '[' + this.config.linkAttributeName + ']'
        );

        if (clickedlink) {
          e.preventDefault();
          this.starter = clickedlink;
          let targetSelector = this.starter.getAttribute(
            this.config.linkAttributeName
          );
          this._nextWindows = document.querySelector(targetSelector);
          this.open();
          return;
        }

        if (e.target.closest('[data-close]')) {
          this.close();
          return;
        }
      }.bind(this)
    );

    window.addEventListener(
      'keydown',
      function (e) {
        if (e.which == 27 && this.isOpened) {
          e.preventDefault();
          this.close();
          return;
        }

        if (e.which == 9 && this.isOpened) {
          this.focusCatcher(e);
          return;
        }
      }.bind(this)
    );

    document.addEventListener(
      'click',
      function (e) {
        const wrap = e.target.classList.contains('modal__wrap');
        if (!wrap) return;
        e.preventDefault();
        this.close();
      }.bind(this)
    );

    addEventListener(
      'popstate',
      function (e) {
        this.close();
      }.bind(this)
    );
  }

  open(selector) {
    this.openedWindow = this._nextWindows;
    this._modalBlock = this.openedWindow.querySelector('.modal__window');
    history.pushState({}, '', '');
    this._bodyScrollControl();
    Modal._shadow.classList.add('modal__shadow--show');
    this.openedWindow.classList.add('modal--active');
    this.openedWindow.setAttribute('aria-hidden', 'false');

    this.isOpened = true;
  }

  close() {
    if (!this.isOpened) {
      return;
    }

    if (this.openedWindow === demoModal) {
      stopVideos();
    }

    if (stakeImg.classList.contains('zoom')) {
      stakeImg.classList.toggle('zoom');
    }

    this.openedWindow.classList.remove('modal--active');
    Modal._shadow.classList.remove('modal__shadow--show');
    this.openedWindow.setAttribute('aria-hidden', 'true');

    this._bodyScrollControl();
    this.isOpened = false;
  }

  _bodyScrollControl() {
    let html = document.documentElement;
    if (this.isOpened === true) {
      html.classList.remove('modal__opened');
      html.style.marginRight = '';
      window.scrollTo(0, this._scrollPosition);
      html.style.top = '';
      return;
    }

    this._scrollPosition = window.pageYOffset;
    html.style.top = -this._scrollPosition + 'px';
    html.classList.add('modal__opened');

    let marginSize = window.innerWidth - html.clientWidth;
    if (marginSize) {
      html.style.marginRight = marginSize + 'px';
    }
    html.style.marginRight = '';
  }
}


export const modalJoin = new Modal({
  linkAttributeName: 'modal_join',
});
