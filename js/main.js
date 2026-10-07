/* =========================================================
   HARUKA BUILD
   MAIN.JS
   Common JavaScript for all pages
========================================================= */

(() => {
  "use strict";


  /* =========================================================
     DOM READY
  ========================================================= */

  const init = () => {
    initMobileMenu();
    initHeader();
    initReveal();
    initBackTop();
    initSmoothScroll();
    initFaq();
    initWorkCardHover();
    initCountUp();

    // PEOPLE
    initEmployeeModal();
  };


  /* =========================================================
     MOBILE MENU
     現在の people.html の
     .menu-btn / .mobile-nav に対応
  ========================================================= */

  const initMobileMenu = () => {

    const menuButton =
      document.querySelector(".menu-btn");

    const mobileNav =
      document.querySelector(".mobile-nav");


    if (!menuButton || !mobileNav) {
      return;
    }


    const openMenu = () => {

      mobileNav.classList.add("is-open");
      menuButton.classList.add("is-open");

      menuButton.setAttribute(
        "aria-expanded",
        "true"
      );

      menuButton.setAttribute(
        "aria-label",
        "メニューを閉じる"
      );

      document.body.classList.add(
        "menu-open"
      );
    };


    const closeMenu = () => {

      mobileNav.classList.remove(
        "is-open"
      );

      menuButton.classList.remove(
        "is-open"
      );

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "メニューを開く"
      );

      document.body.classList.remove(
        "menu-open"
      );
    };


    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          mobileNav.classList.contains(
            "is-open"
          );

        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }

      }
    );


    mobileNav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {
            closeMenu();
          }
        );

      });


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          mobileNav.classList.contains(
            "is-open"
          )
        ) {

          closeMenu();

        }

      }
    );

  };


  /* =========================================================
     HEADER
  ========================================================= */

  const initHeader = () => {

    const header =
      document.querySelector(".header");

    if (!header) return;


    let lastScroll =
      window.scrollY;


    const updateHeader = () => {

      const currentScroll =
        window.scrollY;


      if (currentScroll <= 20) {

        header.classList.remove(
          "header-scrolled"
        );

        header.classList.remove(
          "header-hidden"
        );

        lastScroll =
          currentScroll;

        return;
      }


      header.classList.add(
        "header-scrolled"
      );


      if (
        currentScroll > lastScroll &&
        currentScroll > 120
      ) {

        header.classList.add(
          "header-hidden"
        );

      }


      if (
        currentScroll < lastScroll
      ) {

        header.classList.remove(
          "header-hidden"
        );

      }


      lastScroll =
        currentScroll;
    };


    window.addEventListener(
      "scroll",
      updateHeader,
      { passive: true }
    );


    updateHeader();

  };


  /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const initReveal = () => {

    const elements =
      document.querySelectorAll(
        ".reveal"
      );


    if (!elements.length) return;


    if (
      !("IntersectionObserver" in window)
    ) {

      elements.forEach(element => {

        element.classList.add(
          "is-visible"
        );

      });

      return;
    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target.classList.add(
              "is-visible"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    elements.forEach(element => {

      observer.observe(element);

    });

  };


  /* =========================================================
     BACK TO TOP
  ========================================================= */

  const initBackTop = () => {

    const backTop =
      document.querySelector(
        ".backtop"
      );


    if (!backTop) return;


    const updateBackTop = () => {

      if (
        window.scrollY > 500
      ) {

        backTop.classList.add(
          "is-visible"
        );

      } else {

        backTop.classList.remove(
          "is-visible"
        );

      }

    };


    window.addEventListener(
      "scroll",
      updateBackTop,
      { passive: true }
    );


    backTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );


    updateBackTop();

  };


  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  const initSmoothScroll = () => {

    const links =
      document.querySelectorAll(
        'a[href^="#"]'
      );


    if (!links.length) return;


    links.forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute(
              "href"
            );


          if (
            !href ||
            href === "#"
          ) {

            event.preventDefault();

            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });

            return;
          }


          const target =
            document.querySelector(
              href
            );


          if (!target) return;


          event.preventDefault();


          const header =
            document.querySelector(
              ".header"
            );


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target
              .getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight -
            20;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });

  };


  /* =========================================================
     FAQ
  ========================================================= */

  const initFaq = () => {

    const faqItems =
      document.querySelectorAll(
        ".faq-item"
      );


    if (!faqItems.length) return;


    faqItems.forEach(item => {

      const summary =
        item.querySelector(
          "summary"
        );


      if (!summary) return;


      summary.addEventListener(
        "click",
        () => {
          // detailsの標準動作を使用
        }
      );

    });

  };


  /* =========================================================
     WORK CARD HOVER
  ========================================================= */

  const initWorkCardHover = () => {

    const cards =
      document.querySelectorAll(
        ".work-card"
      );


    if (!cards.length) return;


    const isTouchDevice =
      window.matchMedia(
        "(hover: none)"
      ).matches;


    if (isTouchDevice) return;


    cards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left;


          const y =
            event.clientY -
            rect.top;


          card.style.setProperty(
            "--mouse-x",
            `${x}px`
          );


          card.style.setProperty(
            "--mouse-y",
            `${y}px`
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.setProperty(
            "--mouse-x",
            "50%"
          );


          card.style.setProperty(
            "--mouse-y",
            "50%"
          );

        }
      );

    });

  };


  /* =========================================================
     COUNT UP
     数字でわかる HARUKA BUILD
  ========================================================= */

  const initCountUp = () => {

    const numbers =
      document.querySelectorAll(
        ".count-number, [data-count]"
      );


    if (!numbers.length) return;


    const animateNumber =
      element => {

        const target =
          Number(
            element.dataset.count ||
            element.textContent
              .replace(/,/g, "")
          );


        if (isNaN(target)) return;


        const duration =
          1600;


        const startTime =
          performance.now();


        const update =
          currentTime => {

            const elapsed =
              currentTime -
              startTime;


            const progress =
              Math.min(
                elapsed / duration,
                1
              );


            const eased =
              1 -
              Math.pow(
                1 - progress,
                3
              );


            const current =
              Math.floor(
                target * eased
              );


            element.textContent =
              current.toLocaleString();


            if (
              progress < 1
            ) {

              requestAnimationFrame(
                update
              );

            } else {

              element.textContent =
                target.toLocaleString();

            }

          };


        requestAnimationFrame(
          update
        );

      };


    if (
      !("IntersectionObserver" in window)
    ) {

      numbers.forEach(element => {

        const target =
          Number(
            element.dataset.count ||
            element.textContent
              .replace(/,/g, "")
          );


        if (!isNaN(target)) {

          element.textContent =
            target.toLocaleString();

        }

      });

      return;
    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            const element =
              entry.target;


            if (
              element.dataset.counted ===
              "true"
            ) {
              return;
            }


            element.dataset.counted =
              "true";


            animateNumber(
              element
            );


            observer.unobserve(
              element
            );

          });

        },
        {
          threshold: 0.5
        }
      );


    numbers.forEach(element => {

      observer.observe(element);

    });

  };


  /* =========================================================
     PEOPLE
     EMPLOYEE VOICE MODAL
  ========================================================= */

  const initEmployeeModal = () => {

    const cards =
      document.querySelectorAll(
        ".person-card"
      );


    const modal =
      document.querySelector(
        "#employeeModal"
      );


    /*
      PEOPLEページ以外では何もしない
    */

    if (
      !cards.length ||
      !modal
    ) {
      return;
    }


    /* -------------------------------------------------------
       Modal内の要素
    ------------------------------------------------------- */

    const modalNumber =
      document.querySelector(
        "#modalNumber"
      );


    const modalRole =
      document.querySelector(
        "#modalRole"
      );


    const modalName =
      document.querySelector(
        "#modalName"
      );


    const modalLead =
      document.querySelector(
        "#modalLead"
      );


    const modalWork =
      document.querySelector(
        "#modalWork"
      );


    const modalReward =
      document.querySelector(
        "#modalReward"
      );


    const modalImpression =
      document.querySelector(
        "#modalImpression"
      );


    const modalMessage =
      document.querySelector(
        "#modalMessage"
      );


    /*
      ★ここが今回の重要ポイント

      HTMLは

      .employee-modal-close

      というクラスになっている
    */

    const closeButton =
      modal.querySelector(
        ".employee-modal-close"
      );


    const modalBackground =
      modal.querySelector(
        ".employee-modal-bg"
      );


    /* -------------------------------------------------------
       4人分のデータ
    ------------------------------------------------------- */

    const employeeData = {

      people1: {
        number: "01",
        role: "RYO / 施工管理",
        name: "RYO",
        lead:
          "現場が完成した瞬間の達成感が、一番好きです。",
        work:
          "現場全体の進行を管理し、職人さんや協力会社と連携しています。",
        reward:
          "自分が関わった建物が完成して、街に残っていくこと。",
        impression:
          "年齢に関係なく意見を言いやすく、先輩にも相談しやすい環境です。",
        message:
          "未経験からのスタートでしたが、できることが増えるたびに仕事が面白くなりました。"
      },


      people2: {
        number: "02",
        role: "MIKA / 設計",
        name: "MIKA",
        lead:
          "自分のアイデアが、実際の建物になっていく。",
        work:
          "お客様の希望を聞きながら、図面や仕様をまとめています。",
        reward:
          "自分が描いたものが現場で少しずつ形になっていくこと。",
        impression:
          "設計だけでなく現場の人とも話す機会が多く、いろいろな視点を学べます。",
        message:
          "考えたことが形になる仕事だからこそ、毎回新しい発見があります。"
      },


      people3: {
        number: "03",
        role: "KENTO / 現場スタッフ",
        name: "KENTO",
        lead:
          "頼られるようになると、仕事がもっと面白くなる。",
        work:
          "現場での施工や資材の準備、安全確認などを担当しています。",
        reward:
          "以前できなかった仕事を任せてもらえたときに成長を実感します。",
        impression:
          "分からないことを聞きやすく、先輩がしっかり教えてくれる環境です。",
        message:
          "最初は先輩についていくことで精一杯でしたが、今では後輩に教えることも増えました。"
      },


      people4: {
        number: "04",
        role: "YUI / 営業",
        name: "YUI",
        lead:
          "人と話すことが好き。それが仕事につながっています。",
        work:
          "お客様の希望を聞き、社内のメンバーと相談しながら提案を作っています。",
        reward:
          "お客様から「お願いしてよかった」と言っていただけること。",
        impression:
          "部署を越えて相談しやすく、チームで仕事を進めている感覚があります。",
        message:
          "人と関わることが好きなら、きっと楽しめる仕事だと思います。"
      }

    };


    /* -------------------------------------------------------
       Modalを開く
    ------------------------------------------------------- */

    const openModal =
      card => {

        const personId =
          card.dataset.person;


        const data =
          employeeData[
            personId
          ];


        /*
          データが見つからない場合
        */

        if (!data) {

          console.warn(
            "Employee data not found:",
            personId
          );

          return;
        }


        /* -----------------------------------------------
           内容をセット
        ----------------------------------------------- */

        if (modalNumber) {

          modalNumber.textContent =
            data.number;

        }


        if (modalRole) {

          modalRole.textContent =
            data.role;

        }


        if (modalName) {

          modalName.textContent =
            data.name;

        }


        if (modalLead) {

          modalLead.textContent =
            data.lead;

        }


        if (modalWork) {

          modalWork.textContent =
            data.work;

        }


        if (modalReward) {

          modalReward.textContent =
            data.reward;

        }


        if (modalImpression) {

          modalImpression.textContent =
            data.impression;

        }


        if (modalMessage) {

          modalMessage.textContent =
            data.message;

        }


        /* -----------------------------------------------
           Modal表示
        ----------------------------------------------- */

        modal.classList.add(
          "is-open"
        );


        modal.setAttribute(
          "aria-hidden",
          "false"
        );


        document.body.classList.add(
          "modal-open"
        );


        /* -----------------------------------------------
           選択中のカード
        ----------------------------------------------- */

        cards.forEach(item => {

          item.classList.remove(
            "is-active"
          );

        });


        card.classList.add(
          "is-active"
        );

      };


    /* -------------------------------------------------------
       Modalを閉じる
    ------------------------------------------------------- */

    const closeModal =
      () => {

        modal.classList.remove(
          "is-open"
        );


        modal.setAttribute(
          "aria-hidden",
          "true"
        );


        document.body.classList.remove(
          "modal-open"
        );


        cards.forEach(card => {

          card.classList.remove(
            "is-active"
          );

        });

      };


    /* -------------------------------------------------------
       写真クリック
    ------------------------------------------------------- */

    cards.forEach(card => {

      card.addEventListener(
        "click",
        () => {

          openModal(card);

        }
      );


      /* キーボード操作 */

      card.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openModal(card);

          }

        }
      );

    });


    /* -------------------------------------------------------
       ×ボタン
    ------------------------------------------------------- */

    if (closeButton) {

      closeButton.addEventListener(
        "click",
        event => {

          event.preventDefault();
          event.stopPropagation();

          closeModal();

        }
      );

    }


    /* -------------------------------------------------------
       背景クリック
    ------------------------------------------------------- */

    if (modalBackground) {

      modalBackground.addEventListener(
        "click",
        () => {

          closeModal();

        }
      );

    }


    /* -------------------------------------------------------
       Modal本体をクリックした場合
       背景以外では閉じない
    ------------------------------------------------------- */

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeModal();

        }

      }
    );


    /* -------------------------------------------------------
       ESCキー
    ------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          modal.classList.contains(
            "is-open"
          )
        ) {

          closeModal();

        }

      }
    );

  };


  /* =========================================================
     PAGE LOAD
  ========================================================= */

  const initPageLoad = () => {

    document.documentElement.classList.add(
      "is-loaded"
    );

  };


  /* =========================================================
     START
  ========================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      () => {

        init();

        initPageLoad();

      }
    );

  } else {

    init();

    initPageLoad();

  }

})();