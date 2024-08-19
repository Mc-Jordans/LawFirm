document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = mainNav.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                if (window.innerWidth <= 768 && mainNav && menuToggle) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Sample data (in a real-world scenario, this would come from a server)
    const practiceAreas = [
        { id: 1, name: 'Family Law', description: 'Divorce, child custody, and more.' },
        { id: 2, name: 'Criminal Defense', description: 'Protecting your rights in criminal cases.' },
        { id: 3, name: 'Personal Injury', description: 'Compensation for accidents and injuries.' },
        { id: 4, name: 'Corporate Law', description: 'Legal services for businesses and corporations.' }
    ];

    const attorneys = [
        { id: 1, name: 'John Doe', bio: 'Experienced in family law.', photo: 'images/john-doe.jpg' },
        { id: 2, name: 'Jane Smith', bio: 'Specializes in criminal defense.', photo: 'images/jane-smith.jpg' },
        { id: 3, name: 'Mike Johnson', bio: 'Expert in personal injury cases.', photo: 'images/mike-johnson.jpg' }
    ];

    const blogPosts = [
        { id: 1, title: 'Understanding Divorce Proceedings', summary: 'A guide to navigating divorce.' },
        { id: 2, title: 'What to Do After a Car Accident', summary: 'Steps to take following a collision.' },
        { id: 3, title: 'Business Incorporation: Pros and Cons', summary: 'Exploring different business structures.' }
    ];

    // Populate practice areas
    const practiceAreaGrid = document.querySelector('.practice-area-grid');
    if (practiceAreaGrid) {
        practiceAreas.forEach(area => {
            const areaElement = document.createElement('div');
            areaElement.className = 'practice-area';
            areaElement.innerHTML = `
                <h3>${area.name}</h3>
                <p>${area.description}</p>
            `;
            practiceAreaGrid.appendChild(areaElement);
        });
    }

    // Populate attorneys
    const attorneyGrid = document.querySelector('.attorney-grid');
    if (attorneyGrid) {
        attorneys.forEach(attorney => {
            const attorneyElement = document.createElement('div');
            attorneyElement.className = 'attorney';
            attorneyElement.innerHTML = `
                <img src="${attorney.photo}" alt="${attorney.name}">
                <div class="attorney-info">
                    <h3>${attorney.name}</h3>
                    <p>${attorney.bio}</p>
                </div>
            `;
            attorneyGrid.appendChild(attorneyElement);
        });
    }

    // Populate blog posts
    const blogPostsContainer = document.querySelector('.blog-posts');
    if (blogPostsContainer) {
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="#" class="read-more">Read More</a>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    }

    // Handle form submission
   const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        
        // Send form data using fetch
        fetch('process_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Show success message
            showMessage('Thank you for your message. We will get back to you soon.', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error message
            showMessage('There was an error submitting your form. Please try again.', 'error');
        });
        
        // Reset form after submission
        contactForm.reset();
    });
}

            
            // Show success message
            showMessage('Thank you for your message. We will get back to you soon.', 'success');
            
            contactForm.reset();
        });
    }

    // Function to show message
  function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    if (contactForm) {
        contactForm.appendChild(messageElement);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}


    // Scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Scroll to top button
    const scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '↑';
    document.body.appendChild(scrollToTop);

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Reveal function for scroll animations
    function reveal() {
        const reveals = document.querySelectorAll(".section");
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Update scroll progress
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';

        // Show/hide scroll to top button
        if (scrollTop > windowHeight) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            } else {
                reveal.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", reveal);

    // Trigger reveal on page load
    reveal();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = -(scrollPosition * 0.5) + 'px';
        });
    }
});
