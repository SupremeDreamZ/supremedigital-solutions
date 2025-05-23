// SupremeDigital Solutions - Interactive Business Website
// Professional JavaScript for client engagement and lead generation

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupSmoothScrolling();
    setupContactForm();
    setupAnimations();
    setupLeadTracking();
    displayBusinessMetrics();
}

// Smooth scrolling for navigation
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contact form handling with lead generation
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const leadData = {
            name: formData.get('name') || this.querySelector('input[type="text"]').value,
            email: formData.get('email') || this.querySelector('input[type="email"]').value,
            service: formData.get('service') || this.querySelector('select').value,
            description: formData.get('description') || this.querySelector('textarea').value,
            timestamp: new Date().toISOString(),
            source: 'website_contact_form'
        };
        
        processLead(leadData);
    });
}

// Lead processing and revenue calculation
function processLead(leadData) {
    // Store lead data
    const leads = JSON.parse(localStorage.getItem('supremeDigitalLeads') || '[]');
    leads.push(leadData);
    localStorage.setItem('supremeDigitalLeads', JSON.stringify(leads));
    
    // Calculate potential revenue
    const serviceValues = {
        'web-dev': 2500,
        'data-viz': 1500,
        'optimization': 800,
        'automation': 1200,
        'github': 600,
        'strategy': 2000
    };
    
    const potentialRevenue = serviceValues[leadData.service] || 1000;
    
    // Update business metrics
    updateBusinessMetrics(potentialRevenue);
    
    // Show success message with revenue projection
    showLeadConfirmation(leadData, potentialRevenue);
    
    // Generate automatic proposal
    generateProposal(leadData, potentialRevenue);
}

// Business metrics tracking
function updateBusinessMetrics(newRevenue) {
    const metrics = JSON.parse(localStorage.getItem('businessMetrics') || '{"totalRevenue": 0, "totalLeads": 0, "conversionRate": 0.25}');
    
    metrics.totalLeads += 1;
    metrics.potentialRevenue = (metrics.potentialRevenue || 0) + newRevenue;
    metrics.projectedRevenue = metrics.potentialRevenue * metrics.conversionRate;
    
    localStorage.setItem('businessMetrics', JSON.stringify(metrics));
    displayBusinessMetrics();
}

// Display real-time business metrics
function displayBusinessMetrics() {
    const metrics = JSON.parse(localStorage.getItem('businessMetrics') || '{"totalRevenue": 0, "totalLeads": 0, "conversionRate": 0.25, "potentialRevenue": 0}');
    
    // Create metrics dashboard if it doesn't exist
    if (!document.getElementById('businessDashboard')) {
        createBusinessDashboard();
    }
    
    // Update metrics display
    document.getElementById('totalLeads').textContent = metrics.totalLeads || 0;
    document.getElementById('potentialRevenue').textContent = `$${(metrics.potentialRevenue || 0).toLocaleString()}`;
    document.getElementById('projectedRevenue').textContent = `$${(metrics.projectedRevenue || 0).toLocaleString()}`;
    document.getElementById('conversionRate').textContent = `${(metrics.conversionRate * 100).toFixed(1)}%`;
}

// Create business dashboard
function createBusinessDashboard() {
    const dashboard = document.createElement('div');
    dashboard.id = 'businessDashboard';
    dashboard.innerHTML = `
        <div style="position: fixed; top: 100px; right: 20px; background: rgba(255,255,255,0.95); padding: 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); z-index: 999; min-width: 250px;">
            <h4 style="margin-bottom: 15px; color: #667eea;">📊 Business Metrics</h4>
            <div style="margin-bottom: 10px;">
                <strong>Total Leads:</strong> <span id="totalLeads">0</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Potential Revenue:</strong> <span id="potentialRevenue">$0</span>
            </div>
            <div style="margin-bottom: 10px;">
                <strong>Projected Revenue:</strong> <span id="projectedRevenue">$0</span>
            </div>
            <div style="margin-bottom: 15px;">
                <strong>Conversion Rate:</strong> <span id="conversionRate">25.0%</span>
            </div>
            <button onclick="generateBusinessReport()" style="width: 100%; padding: 8px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Generate Report</button>
        </div>
    `;
    document.body.appendChild(dashboard);
}

// Lead confirmation with revenue projection
function showLeadConfirmation(leadData, potentialRevenue) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 40px; border-radius: 15px; max-width: 500px; text-align: center;">
                <h3 style="color: #28a745; margin-bottom: 20px;">✅ Lead Captured Successfully!</h3>
                <p><strong>Client:</strong> ${leadData.name}</p>
                <p><strong>Service:</strong> ${leadData.service}</p>
                <p><strong>Potential Value:</strong> $${potentialRevenue.toLocaleString()}</p>
                <p style="margin: 20px 0;">A custom proposal has been generated and will be sent within 24 hours.</p>
                <button onclick="this.parentElement.parentElement.remove()" style="padding: 10px 30px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (modal.parentElement) {
            modal.remove();
        }
    }, 5000);
}

// Automatic proposal generation
function generateProposal(leadData, potentialRevenue) {
    const proposal = {
        clientName: leadData.name,
        service: leadData.service,
        basePrice: potentialRevenue,
        timeline: getServiceTimeline(leadData.service),
        deliverables: getServiceDeliverables(leadData.service),
        generatedAt: new Date().toISOString()
    };
    
    // Store proposal
    const proposals = JSON.parse(localStorage.getItem('generatedProposals') || '[]');
    proposals.push(proposal);
    localStorage.setItem('generatedProposals', JSON.stringify(proposals));
    
    console.log('Proposal generated:', proposal);
}

// Service timeline mapping
function getServiceTimeline(service) {
    const timelines = {
        'web-dev': '4-6 weeks',
        'data-viz': '2-3 weeks',
        'optimization': '1-2 weeks',
        'automation': '3-4 weeks',
        'github': '1 week',
        'strategy': '2-4 weeks'
    };
    return timelines[service] || '2-4 weeks';
}

// Service deliverables mapping
function getServiceDeliverables(service) {
    const deliverables = {
        'web-dev': ['Custom website design', 'Responsive development', 'SEO optimization', 'Performance optimization', '30-day support'],
        'data-viz': ['Custom dashboard', 'Interactive charts', 'Data integration', 'Training session', 'Documentation'],
        'optimization': ['Performance audit', 'SEO improvements', 'Speed optimization', 'Accessibility fixes', 'Report & recommendations'],
        'automation': ['Custom automation scripts', 'Integration setup', 'Testing & validation', 'Documentation', 'Training'],
        'github': ['Repository setup', 'Workflow configuration', 'Documentation', 'Team training', 'Best practices guide'],
        'strategy': ['Digital assessment', 'Strategy roadmap', 'Implementation plan', 'Technology recommendations', 'Ongoing consultation']
    };
    return deliverables[service] || ['Custom solution', 'Implementation', 'Testing', 'Documentation', 'Support'];
}

// CTA button functions
function openContactForm() {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Focus on first form field
    setTimeout(() => {
        document.querySelector('.contact-form input').focus();
    }, 500);
}

function viewPortfolio() {
    document.getElementById('portfolio').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Business report generation
function generateBusinessReport() {
    const metrics = JSON.parse(localStorage.getItem('businessMetrics') || '{}');
    const leads = JSON.parse(localStorage.getItem('supremeDigitalLeads') || '[]');
    const proposals = JSON.parse(localStorage.getItem('generatedProposals') || '[]');
    
    const report = {
        generatedAt: new Date().toISOString(),
        summary: {
            totalLeads: leads.length,
            potentialRevenue: metrics.potentialRevenue || 0,
            projectedRevenue: metrics.projectedRevenue || 0,
            conversionRate: metrics.conversionRate || 0.25,
            averageDealSize: leads.length > 0 ? (metrics.potentialRevenue / leads.length) : 0
        },
        leads: leads,
        proposals: proposals,
        recommendations: generateBusinessRecommendations(metrics, leads)
    };
    
    // Display report
    showBusinessReport(report);
    
    return report;
}

// Business recommendations based on data
function generateBusinessRecommendations(metrics, leads) {
    const recommendations = [];
    
    if (leads.length < 5) {
        recommendations.push("Increase marketing efforts to generate more leads");
    }
    
    if (metrics.conversionRate < 0.2) {
        recommendations.push("Improve lead qualification and follow-up processes");
    }
    
    if (metrics.potentialRevenue > 10000) {
        recommendations.push("Consider hiring additional team members to handle increased demand");
    }
    
    // Service-specific recommendations
    const serviceCount = {};
    leads.forEach(lead => {
        serviceCount[lead.service] = (serviceCount[lead.service] || 0) + 1;
    });
    
    const topService = Object.keys(serviceCount).reduce((a, b) => serviceCount[a] > serviceCount[b] ? a : b, '');
    if (topService) {
        recommendations.push(`Focus marketing on ${topService} services - highest demand`);
    }
    
    return recommendations;
}

// Display business report
function showBusinessReport(report) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; overflow-y: auto;">
            <div style="background: white; margin: 50px auto; padding: 40px; border-radius: 15px; max-width: 800px;">
                <h2 style="color: #667eea; margin-bottom: 30px;">📈 Business Performance Report</h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                        <h4>Total Leads</h4>
                        <div style="font-size: 2rem; color: #667eea; font-weight: bold;">${report.summary.totalLeads}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                        <h4>Potential Revenue</h4>
                        <div style="font-size: 2rem; color: #28a745; font-weight: bold;">$${report.summary.potentialRevenue.toLocaleString()}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                        <h4>Projected Revenue</h4>
                        <div style="font-size: 2rem; color: #ff6b6b; font-weight: bold;">$${report.summary.projectedRevenue.toLocaleString()}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                        <h4>Avg Deal Size</h4>
                        <div style="font-size: 2rem; color: #764ba2; font-weight: bold;">$${report.summary.averageDealSize.toLocaleString()}</div>
                    </div>
                </div>
                
                <h3 style="margin-bottom: 15px;">💡 Recommendations</h3>
                <ul style="margin-bottom: 30px;">
                    ${report.recommendations.map(rec => `<li style="margin-bottom: 10px;">${rec}</li>`).join('')}
                </ul>
                
                <div style="text-align: center;">
                    <button onclick="downloadReport()" style="margin-right: 10px; padding: 10px 30px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">Download Report</button>
                    <button onclick="this.closest('div').parentElement.remove()" style="padding: 10px 30px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Download business report
function downloadReport() {
    const report = generateBusinessReport();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `supremedigital-report-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Animation setup
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Lead tracking and analytics
function setupLeadTracking() {
    // Track page views
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
    localStorage.setItem('pageViews', pageViews.toString());
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime;
        const totalTime = parseInt(localStorage.getItem('totalTimeSpent') || '0') + timeSpent;
        localStorage.setItem('totalTimeSpent', totalTime.toString());
    });
    
    // Track button clicks
    document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            const clicks = JSON.parse(localStorage.getItem('buttonClicks') || '{}');
            const buttonText = button.textContent.trim();
            clicks[buttonText] = (clicks[buttonText] || 0) + 1;
            localStorage.setItem('buttonClicks', JSON.stringify(clicks));
        });
    });
}

// Initialize revenue simulation
function simulateBusinessGrowth() {
    // Simulate organic lead generation
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 30 seconds
            const services = ['web-dev', 'data-viz', 'optimization', 'automation', 'github', 'strategy'];
            const randomService = services[Math.floor(Math.random() * services.length)];
            
            const simulatedLead = {
                name: `Prospect ${Date.now()}`,
                email: `prospect${Date.now()}@example.com`,
                service: randomService,
                description: 'Simulated lead for demonstration',
                timestamp: new Date().toISOString(),
                source: 'organic_simulation'
            };
            
            processLead(simulatedLead);
        }
    }, 30000); // Check every 30 seconds
}

// Start business growth simulation
setTimeout(simulateBusinessGrowth, 5000); // Start after 5 seconds

// Export functions for external use
window.SupremeDigital = {
    generateBusinessReport,
    processLead,
    updateBusinessMetrics,
    displayBusinessMetrics
};