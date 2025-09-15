// small helpers: mobile nav toggle + dark mode + current year
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('site-nav');
    const toggle = document.getElementById('nav-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement; // Reference to <html> element

    // Mobile Navigation Toggle
    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        
        // Prevent background scrolling when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Theme: remember in localStorage + system preference
    const getPreferredTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
            html.setAttribute('data-theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            html.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize theme
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);

    // Theme toggle button functionality
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Listen for system theme changes 
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change if user hasn't explicitly set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Close mobile menu when clicking on a link 
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    });
});
