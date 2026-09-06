/**
 * Visitor Welcome Modal Script
 * 
 * Functionality:
 * 1. Waits 5 seconds after page load.
 * 2. Fetches visitor data (City, ISP) from a free API.
 * 3. Populates the modal with the data.
 * 4. Displays the modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const DELAY_MS = 5000; // 5 seconds
    const API_PRIMARY = 'https://ipapi.co/json/';

    // Elements
    const modal = document.getElementById('visitor-modal');
    const closeBtn = document.querySelector('.close-button');
    const cityEl = document.getElementById('detail-city');
    const ispEl = document.getElementById('detail-isp');
    const locationEl = document.getElementById('visitor-location');
    const messageEl = document.getElementById('visitor-message');

    // State
    let visitorData = {
        city: 'Earth',
        isp: 'Unknown Provider'
    };

    /**
     * Fetch visitor data from IP API with a timeout
     */
    async function fetchVisitorData() {
        const fetchPromise = fetch(API_PRIMARY)
            .then(async (response) => {
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                // Update state with valid data
                if (data.city) visitorData.city = data.city;
                if (data.org) visitorData.isp = data.org;
            });

        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out')), 2000)
        );

        try {
            // Race between fetch and 2-second timeout
            await Promise.race([fetchPromise, timeoutPromise]);
            return true;
        } catch (error) {
            console.warn('Could not fetch visitor data (or timed out):', error);
            // Modal will show with default values ('Earth', 'Unknown Provider')
            return false;
        }
    }

    /**
     * Detect Mobile Device
     */
    function getMobileDeviceName() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'iPhone';
        if (/android/i.test(ua)) return 'Android Device';
        return null;
    }

    /**
     * Update the DOM with fetched data
     */
    function updateModalContent() {
        // Update specific fields
        cityEl.textContent = visitorData.city;
        ispEl.textContent = visitorData.isp;

        // Personalized Mobile Greeting
        const deviceName = getMobileDeviceName();
        if (deviceName) {
            locationEl.textContent = `${deviceName} User`;
        }

        // Set the personalized message
        messageEl.textContent = `Welcome! I'm Ahmed — a software engineer who helps businesses grow with modern websites, custom business systems, and practical tech advice. I'm currently taking on new projects, so if you have an idea in mind, let's build it together.`;
    }

    /**
     * Show the modal
     */
    function showModal() {
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
    }

    /**
     * Hide the modal
     */
    function hideModal() {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
    }

    // Initialize — only show the modal once per visitor to avoid being annoying
    setTimeout(async () => {
        if (localStorage.getItem('visitorModalSeen')) {
            return;
        }
        localStorage.setItem('visitorModalSeen', 'true');

        // Start fetching data
        await fetchVisitorData();

        // Update UI
        updateModalContent();

        // Show Modal
        showModal();
    }, DELAY_MS);

    // Event Listeners
    closeBtn.addEventListener('click', hideModal);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            hideModal();
        }
    });
});
