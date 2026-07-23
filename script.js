document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Dashboard loaded');
    
    // Dark mode functionality
    const darkToggle = document.getElementById('darkToggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // MAIN TAB SWITCHING FUNCTIONALITY
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    console.log(`📊 Found ${sidebarLinks.length} sidebar links`);
    console.log(`📄 Found ${dashboardSections.length} dashboard sections`);
    
    // Function to show specific tab
    function showTab(targetSectionId) {
        console.log(`🎯 Showing tab: ${targetSectionId}`);
        
        // Hide all sections
        dashboardSections.forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });
        
        // Remove active from all sidebar links
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            console.log(`✅ Successfully showed section: ${targetSectionId}`);
        } else {
            console.error(`❌ Section not found: ${targetSectionId}`);
        }
        
        // Activate corresponding sidebar link
        const targetLink = document.querySelector(`[data-section="${targetSectionId}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
            console.log(`✅ Successfully activated sidebar link: ${targetSectionId}`);
        } else {
            console.error(`❌ Sidebar link not found: ${targetSectionId}`);
        }
    }
    
    // Add click events to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            console.log(`🖱️ Clicked sidebar link for: ${sectionId}`);
            showTab(sectionId);
        });
    });
    
    // Show overview tab by default
    showTab('overview');
    
    // PROJECTS TAB FUNCTIONALITY
    const addProjectBtn = document.getElementById('add-new-project');
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectName = prompt('Enter project name:');
            if (projectName && projectName.trim()) {
                alert(`Project "${projectName}" will be added to your dashboard!`);
            }
        });
    }
    
    // VERIFICATION FUNCTIONALITY
    const statusFilters = document.querySelectorAll('.filter-select');
    const searchFilter = document.querySelector('.filter-search');
    
    if (statusFilters.length > 0) {
        statusFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                console.log('📊 Filter changed:', this.value);
            });
        });
    }
    
    if (searchFilter) {
        searchFilter.addEventListener('input', function() {
            console.log('🔍 Search changed:', this.value);
        });
    }
    
    // VERIFICATION ACTION BUTTONS
    const actionButtons = document.querySelectorAll('.dashboard-action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent;
            const originalText = this.textContent;
            
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`Action "${action}" completed!`);
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        });
    });
    
    // SETTINGS FUNCTIONALITY
    const toggleSwitches = document.querySelectorAll('.dashboard-toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const parentItem = this.closest('.security-item, .notification-item');
            if (parentItem) {
                const title = parentItem.querySelector('h4').textContent;
                console.log(`⚙️ ${title} ${this.checked ? 'enabled' : 'disabled'}`);
            }
        });
    });
    
    // ALL BUTTON FUNCTIONALITY
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip if it's already handled (like add-new-project)
            if (this.id === 'add-new-project') return;
            
            if (this.textContent.includes('Save') || 
                this.textContent.includes('Update') || 
                this.textContent.includes('Connect') || 
                this.textContent.includes('Regenerate') ||
                this.textContent.includes('Open verification logs')) {
                
                e.preventDefault();
                const originalText = this.textContent;
                
                this.textContent = 'Processing...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = 'Success!';
                    this.style.background = '#10B981';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                        this.disabled = false;
                    }, 2000);
                }, 1500);
            }
        });
    });
    
    // FORM INPUT FEEDBACK
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#10B981';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 2000);
            }
        });
    });
    
    // CONNECT WALLET IN NAVBAR
    const connectWalletBtn = document.querySelector('.btn-connect');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.textContent = 'Connecting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Wallet Connected';
                this.style.background = '#10B981';
                setTimeout(() => {
                    this.textContent = 'Connect Wallet';
                    this.style.background = '';
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
    
    console.log(' Dashboard initialization complete!');
});
