const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}


/* ==============================
   ACTIVE MENU / SECTION
   ============================== */

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}


/* ==============================
   REVEAL ANIMATION
   ============================== */

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
}


/* ==============================
   CURRENT YEAR
   ============================== */

const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ==============================
   ABOUT M TECH
   বিস্তারিত দেখুন / সংক্ষেপে দেখুন
   ============================== */

document.querySelectorAll('.about-more-btn').forEach(button => {

  button.addEventListener('click', function () {

    const card = button.closest('.about-focus-card');

    if (!card) return;

    const open = card.classList.toggle('is-open');

    /* অন্য About Card বন্ধ করবে */
    document.querySelectorAll('.about-focus-card.is-open').forEach(other => {

      if (other !== card) {

        other.classList.remove('is-open');

        const otherButton =
          other.querySelector('.about-more-btn');

        if (otherButton) {

          otherButton.setAttribute(
            'aria-expanded',
            'false'
          );

          const textNode = otherButton.firstChild;

          if (textNode) {
            textNode.textContent =
              'বিস্তারিত দেখুন ';
          }
        }
      }
    });


    button.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );


    const textNode = button.firstChild;

    if (textNode) {

      textNode.textContent =
        open
          ? 'সংক্ষেপে দেখুন '
          : 'বিস্তারিত দেখুন ';
    }

  });

});


/* ==============================
   SOFTWARE SOLUTIONS
   বিস্তারিত দেখুন / সংক্ষেপে দেখুন
   ============================== */

document.querySelectorAll('.solution-more-btn').forEach(button => {

  button.addEventListener('click', function () {

    /*
      আপনার HTML-এ class যেটাই থাকুক,
      Solution Card খুঁজে নেওয়ার চেষ্টা করবে।
    */

    const card =
      button.closest('.solution-card') ||
      button.closest('.solution-detail-card');

    if (!card) return;

    const open = card.classList.toggle('is-open');


    /* অন্য Solution Card বন্ধ করবে */

    document.querySelectorAll(
      '.solution-card.is-open, .solution-detail-card.is-open'
    ).forEach(other => {

      if (other !== card) {

        other.classList.remove('is-open');

        const otherButton =
          other.querySelector('.solution-more-btn');

        if (otherButton) {

          otherButton.setAttribute(
            'aria-expanded',
            'false'
          );

          const textNode = otherButton.firstChild;

          if (textNode) {
            textNode.textContent =
              'বিস্তারিত দেখুন ';
          }
        }
      }

    });


    button.setAttribute(
      'aria-expanded',
      open ? 'true' : 'false'
    );


    const textNode = button.firstChild;

    if (textNode) {

      textNode.textContent =
        open
          ? 'সংক্ষেপে দেখুন '
          : 'বিস্তারিত দেখুন ';
    }

  });

});


/* ==============================
   SOFTWARE ORDER
   বাংলা / English
   ============================== */

(function () {

  const englishBtn =
    document.getElementById('englishBtn');

  const banglaBtn =
    document.getElementById('banglaBtn');


  if (!englishBtn || !banglaBtn) {
    return;
  }


  const el = function (id) {
    return document.getElementById(id);
  };


  function setText(id, text) {

    const element = el(id);

    if (element) {
      element.textContent = text;
    }

  }


  function setHTML(id, html) {

    const element = el(id);

    if (element) {
      element.innerHTML = html;
    }

  }


  function setPlaceholder(id, text) {

    const element = el(id);

    if (element) {
      element.placeholder = text;
    }

  }


  function setLanguage(lang) {

    const bn = lang === 'bn';


    document.documentElement.lang =
      bn ? 'bn' : 'en';


    /* Heading */

    setText(
      'orderKicker',
      bn
        ? 'সফটওয়্যার অর্ডার'
        : 'SOFTWARE ORDER'
    );


    setHTML(
      'orderTitle',
      bn
        ? 'আপনার প্রয়োজনের <span>সফটওয়্যার?</span>'
        : 'Need custom <span>software?</span>'
    );


    setText(
      'orderSubtitle',
      bn
        ? 'আপনার প্রয়োজনীয়তা আমাদের জানান। আমাদের টিম আপনার সঙ্গে যোগাযোগ করবে।'
        : 'Tell us about your requirements and our team will get in touch with you.'
    );


    setText(
      'languageLabel',
      bn ? 'ভাষা:' : 'Language:'
    );


    /* Intro */

    setText(
      'introTitle',
      bn
        ? 'M Tech থেকে সফটওয়্যার অর্ডার করুন'
        : 'Order Software from M Tech'
    );


    setText(
      'introText',
      bn
        ? 'আপনার ব্যবসা বা প্রয়োজনীয় সফটওয়্যার সম্পর্কে তথ্য দিন। আমাদের টিম আপনার অনুরোধ পর্যালোচনা করে যোগাযোগ করবে।'
        : 'Tell us about your business or software requirements. Our team will review your request and contact you.'
    );


    /* Points */

    setText(
      'pointOne',
      bn
        ? 'কাস্টম সফটওয়্যার সমাধান'
        : 'Custom software solutions'
    );


    setText(
      'pointTwo',
      bn
        ? 'ব্যবসা ব্যবস্থাপনা Software'
        : 'Business management systems'
    );


    setText(
      'pointThree',
      bn
        ? 'প্রয়োজন অনুযায়ী Software'
        : 'Software built for your needs'
    );


    /* Form Labels */

    setText(
      'nameLabel',
      bn
        ? 'আপনার নাম *'
        : 'Your Name *'
    );


    setText(
      'phoneLabel',
      bn
        ? 'মোবাইল নম্বর *'
        : 'Phone Number *'
    );


    setText(
      'emailLabel',
      bn
        ? 'ইমেইল'
        : 'Email'
    );


    setText(
      'companyLabel',
      bn
        ? 'প্রতিষ্ঠান / ব্যবসার নাম *'
        : 'Company / Business Name *'
    );


    setText(
      'businessTypeLabel',
      bn
        ? 'ব্যবসার ধরন *'
        : 'Business Type *'
    );


    setText(
      'businessTypeDefault',
      bn
        ? 'ব্যবসার ধরন নির্বাচন করুন'
        : 'Select business type'
    );


    setText(
      'businessRetail',
      bn
        ? 'খুচরা ব্যবসা'
        : 'Retail Business'
    );


    setText(
      'businessWholesale',
      bn
        ? 'পাইকারি ব্যবসা'
        : 'Wholesale Business'
    );


    setText(
      'businessManufacturing',
      bn
        ? 'উৎপাদন ব্যবসা'
        : 'Manufacturing'
    );


    setText(
      'businessService',
      bn
        ? 'সেবা ব্যবসা'
        : 'Service Business'
    );


    setText(
      'businessRestaurant',
      bn
        ? 'রেস্টুরেন্ট / খাদ্য ব্যবসা'
        : 'Restaurant / Food Business'
    );


    setText(
      'businessOther',
      bn
        ? 'অন্যান্য'
        : 'Other'
    );


    setText(
      'softwareTypeLabel',
      bn
        ? 'কী ধরনের সফটওয়্যার প্রয়োজন? *'
        : 'What type of software do you need? *'
    );


    setText(
      'requirementsLabel',
      bn
        ? 'প্রয়োজনীয় ফিচার / কাজগুলো লিখুন *'
        : 'Required Features / Work *'
    );


    setHTML(
      'submitOrderBtn',
      bn
        ? 'অর্ডার পাঠান <span>→</span>'
        : 'Submit Software Order <span>→</span>'
    );


    /* Placeholders */

    setPlaceholder(
      'customerName',
      bn
        ? 'আপনার পূর্ণ নাম লিখুন'
        : 'Enter your full name'
    );


    setPlaceholder(
      'customerPhone',
      '01XXXXXXXXX'
    );


    setPlaceholder(
      'customerEmail',
      bn
        ? 'আপনার ইমেইল লিখুন'
        : 'Enter your email'
    );


    setPlaceholder(
      'companyName',
      bn
        ? 'প্রতিষ্ঠান বা ব্যবসার নাম'
        : 'Enter your company name'
    );


    setPlaceholder(
      'softwareType',
      bn
        ? 'যেমন: Business Management, Stock, Restaurant'
        : 'e.g. Business Management, Inventory, POS'
    );


    setPlaceholder(
      'requirements',
      bn
        ? 'আপনার সফটওয়্যারে কী কী কাজ প্রয়োজন তা লিখুন...'
        : 'Tell us what features or work you need...'
    );


    /* Active Language Button */

    banglaBtn.classList.toggle(
      'active',
      bn
    );


    englishBtn.classList.toggle(
      'active',
      !bn
    );

  }


  banglaBtn.addEventListener(
    'click',
    function () {
      setLanguage('bn');
    }
  );


  englishBtn.addEventListener(
    'click',
    function () {
      setLanguage('en');
    }
  );


  /* Default = বাংলা */

  setLanguage('bn');

})();


/* ==============================
   SOFTWARE ORDER FORM
   ============================== */

const orderForm =
  document.getElementById('softwareOrderForm');


if (orderForm) {

  orderForm.addEventListener(
    'submit',
    function (event) {

      /*
        Firebase connection না হওয়া পর্যন্ত
        Form নিজে থেকে কোনো Fake submission করবে না।
      */

      event.preventDefault();


      const submitButton =
        document.getElementById(
          'submitOrderBtn'
        );


      if (!submitButton) return;


      submitButton.disabled = true;


      submitButton.innerHTML =
        document.documentElement.lang === 'bn'
          ? 'তথ্য প্রস্তুত হচ্ছে...'
          : 'Preparing...';


      setTimeout(function () {

        submitButton.disabled = false;


        submitButton.innerHTML =
          document.documentElement.lang === 'bn'
            ? 'অর্ডার পাঠান <span>→</span>'
            : 'Submit Software Order <span>→</span>';

      }, 700);

    }
  );

}
