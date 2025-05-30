
import { SuperAgentResponse } from '@/types/super-agent';
import { MOCK_USER_ACCOUNT } from '@/data/userAccountData';

export const SUPER_AGENT_PROMPT_RESPONSES: Record<string, SuperAgentResponse> = {
  "Help me resolve a water billing dispute with supporting documentation": {
    text: `🤖 **Water Billing Dispute Resolution Complete**

🏠 **Account Information**
Address: ${MOCK_USER_ACCOUNT.address}
Account #: WTR-${MOCK_USER_ACCOUNT.accounts.water.balance}001
Current Balance: $${MOCK_USER_ACCOUNT.accounts.water.balance}

📊 **Multi-Agent Coordination Results**
1. Water Department: Retrieved billing history and identified discrepancy in meter readings from March 2024
2. Property Records: Verified property square footage and occupancy status for accurate billing tier
3. County Services: Cross-referenced utility connection records and found duplicate charge error

🔍 **Dispute Analysis**
- **Issue Identified**: Duplicate service charge applied during March billing cycle
- **Amount in Question**: $127.50 overcharge detected
- **Supporting Evidence**: Meter reading logs, property verification, payment history
- **Resolution Status**: Credit of $127.50 approved for next billing cycle

✅ **Cross-System Verification Complete**
All data sources have been verified and your dispute has been resolved with full documentation.`,
    sources: [
      'Water Department Billing System',
      'Property Records Database', 
      'County Utility Connection Records',
      'St. Louis City Integration Hub'
    ],
    operations: [],
    accountData: MOCK_USER_ACCOUNT,
    options: [
      { text: 'Download Dispute Resolution Report', action: 'download_dispute_report', type: 'primary' },
      { text: 'Set up Billing Alerts', action: 'setup_billing_alerts', type: 'secondary' },
      { text: 'Contact Water Department', action: 'contact_water_dept', type: 'secondary' },
      { text: 'Review Payment History', action: 'review_payment_history', type: 'secondary' }
    ]
  },

  "Find all my city services and their current status across departments": {
    text: `🤖 **Comprehensive City Services Analysis Complete**

🏠 **Account Information**
Address: ${MOCK_USER_ACCOUNT.address}
Resident Since: 2019

📊 **Multi-Department Service Status**
1. Water Department: Account active, $${MOCK_USER_ACCOUNT.accounts.water.balance} balance, autopay enabled
2. Property Records: Current assessment $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}, taxes current
3. Business Services: 2 active licenses, 1 pending renewal
4. Utilities Division: Electric service active, no outages reported
5. County Services: All vital records current, voter registration active

🔄 **Active Services Summary**
- **Water/Sewer**: ✅ Active (Next bill due: Jan 15, 2025)
- **Property Tax**: ✅ Current (Next payment: Apr 30, 2025)
- **Business Licenses**: ⚠️ 1 renewal due (Expires: Feb 28, 2025)
- **Waste Management**: ✅ Active (Next pickup: Tomorrow)
- **Voter Registration**: ✅ Current (District 15, Ward 3)

✅ **Cross-System Verification Complete**
All city service accounts have been located and status verified across departments.`,
    sources: [
      'Water Department Database',
      'Property Tax System',
      'Business License Registry',
      'Utilities Management System',
      'County Records Database'
    ],
    operations: [],
    accountData: MOCK_USER_ACCOUNT,
    options: [
      { text: 'View Detailed Service Report', action: 'view_service_report', type: 'primary' },
      { text: 'Renew Business License', action: 'renew_business_license', type: 'primary' },
      { text: 'Set Service Reminders', action: 'set_service_reminders', type: 'secondary' },
      { text: 'Update Contact Information', action: 'update_contact_info', type: 'secondary' }
    ]
  },

  "Coordinate a business license application with all required departments": {
    text: `🤖 **Business License Coordination Complete**

🏢 **Application Analysis**
Business Type: Food Service Establishment
Location: ${MOCK_USER_ACCOUNT.address}

📊 **Multi-Department Requirements Coordinated**
1. Business Services: General business license application initiated
2. Property Records: Zoning verification completed - commercial use approved
3. Utilities Division: Commercial utility connection requirements assessed
4. County Services: Health department inspection scheduled
5. Fire Department: Safety inspection requirements compiled

📋 **Required Steps Coordinated**
- **Business Registration**: ✅ Forms prepared, $150 fee calculated
- **Zoning Compliance**: ✅ Verified - C-2 Commercial District approved
- **Health Inspection**: 📅 Scheduled for Jan 20, 2025
- **Fire Safety Review**: 📅 Scheduled for Jan 22, 2025
- **Utility Upgrades**: ⚠️ Commercial meter upgrade required ($450)

📄 **Documentation Package Ready**
All required forms, permits, and inspection schedules have been coordinated across departments.

✅ **Cross-System Verification Complete**
Your business license application is ready to proceed through all required departments.`,
    sources: [
      'Business License Registry',
      'Zoning Department Database',
      'Health Department System',
      'Fire Department Records',
      'Utilities Planning System'
    ],
    operations: [],
    options: [
      { text: 'Submit Complete Application', action: 'submit_business_application', type: 'primary' },
      { text: 'Schedule All Inspections', action: 'schedule_all_inspections', type: 'primary' },
      { text: 'Download Application Package', action: 'download_application_package', type: 'secondary' },
      { text: 'Contact Business Advisor', action: 'contact_business_advisor', type: 'secondary' }
    ]
  },

  "Research and cross-reference my property tax assessment with recent changes": {
    text: `🤖 **Property Tax Assessment Analysis Complete**

🏠 **Property Information**
Address: ${MOCK_USER_ACCOUNT.address}
Current Assessment: $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}
Last Assessment: ${MOCK_USER_ACCOUNT.accounts.property.lastAssessment}

📊 **Multi-Source Assessment Verification**
1. Property Records: Retrieved current assessment and 5-year history
2. County Assessor: Cross-referenced recent sales comparables in neighborhood
3. Building Permits: Identified home improvements affecting valuation
4. Water Department: Verified property improvements through utility usage patterns
5. GIS Mapping: Confirmed property boundaries and square footage

📈 **Assessment Analysis Results**
- **Previous Assessment (2023)**: $385,000
- **Current Assessment (2024)**: $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}
- **Change**: +$40,000 (+11.6%)
- **Neighborhood Average Change**: +8.2%
- **Market Factors**: Kitchen renovation (2023), new HVAC system, market appreciation

🔍 **Assessment Accuracy Verification**
✅ Assessment increase justified by documented improvements and market conditions
✅ Comparable properties show similar assessment patterns
✅ No errors detected in property characteristics or calculations

✅ **Cross-System Verification Complete**
Your property tax assessment has been verified as accurate based on improvements and market data.`,
    sources: [
      'County Assessor Database',
      'Property Records System',
      'Building Permits Registry',
      'Real Estate Sales Database',
      'GIS Property Mapping System'
    ],
    operations: [],
    accountData: MOCK_USER_ACCOUNT,
    options: [
      { text: 'View Assessment Details Report', action: 'view_assessment_report', type: 'primary' },
      { text: 'Appeal Assessment', action: 'appeal_assessment', type: 'secondary' },
      { text: 'Set Up Tax Payment Plan', action: 'setup_payment_plan', type: 'secondary' },
      { text: 'Get Property Tax Estimate', action: 'get_tax_estimate', type: 'secondary' }
    ]
  }
};

export const SUPER_AGENT_ACTION_RESPONSES: Record<string, SuperAgentResponse> = {
  // Level 1 responses (from initial prompts)
  "download_dispute_report": {
    text: `📄 **Dispute Resolution Report Generated**

Your comprehensive dispute resolution report has been prepared and is ready for download. This report includes:

• Complete billing history analysis (24 months)
• Meter reading verification documents  
• Credit approval documentation ($127.50)
• Future billing protection recommendations
• Department contact information for follow-up

The report has been saved to your account and sent to your email address. This documentation can be used for your records or if you need to reference this dispute resolution in the future.

**Next Steps:**
- Credit will appear on your next bill (due January 15, 2025)
- New billing alerts are recommended to prevent future issues
- Your case reference number is: WTR-DISP-2024-1201`,
    sources: ['Water Department Dispute Resolution System'],
    operations: [],
    options: [
      { text: 'Enable Automated Billing Alerts', action: 'enable_auto_alerts', type: 'primary' },
      { text: 'Schedule Annual Account Review', action: 'schedule_annual_review', type: 'secondary' },
      { text: 'Print Physical Copy', action: 'print_report_copy', type: 'secondary' }
    ]
  },

  "setup_billing_alerts": {
    text: `🔔 **Billing Alert System Configured**

Your water billing alerts have been successfully set up to prevent future disputes:

**Alert Settings Activated:**
• Monthly usage spike detection (>25% increase)
• Billing amount anomaly alerts (>$50 unexpected change)
• Meter reading verification reminders
• Payment due date notifications (7 days prior)
• Annual billing review reminders

**Delivery Methods:**
• Email notifications: ✅ Enabled
• SMS alerts: ✅ Enabled  
• Mobile app push notifications: ✅ Enabled

These alerts will help you catch potential billing issues early and ensure accurate charges on your account.`,
    sources: ['Water Department Alert System'],
    operations: [],
    options: [
      { text: 'Test Alert System Now', action: 'test_alert_system', type: 'primary' },
      { text: 'Customize Alert Thresholds', action: 'customize_alert_thresholds', type: 'secondary' },
      { text: 'Add Family Member Notifications', action: 'add_family_notifications', type: 'secondary' }
    ]
  },

  "view_service_report": {
    text: `📊 **Detailed City Services Report**

Your comprehensive service status report has been generated with the following insights:

**Critical Actions Needed:**
1. Business License Renewal (Due: Feb 28, 2025) - $85 fee
2. Update emergency contact information across 3 departments

**Upcoming Due Dates:**
• Water bill: January 15, 2025 ($${MOCK_USER_ACCOUNT.accounts.water.balance})
• Property taxes: April 30, 2025 ($3,200 estimated)
• Vehicle registration: March 15, 2025
• Voter registration: Confirmed current

**Service Performance Analysis:**
• Payment history: 100% on-time last 12 months
• Service interruptions: 0 reported issues
• Account status: Excellent standing across all departments
• Estimated annual city service costs: $8,450`,
    sources: ['Multi-Department Service Integration'],
    operations: [],
    options: [
      { text: 'Set Up Automatic Renewals', action: 'setup_auto_renewals', type: 'primary' },
      { text: 'Create Payment Calendar', action: 'create_payment_calendar', type: 'primary' },
      { text: 'Update All Contact Information', action: 'update_all_contacts', type: 'secondary' }
    ]
  },

  "renew_business_license": {
    text: `🏢 **Business License Renewal Process Initiated**

Your business license renewal has been successfully started and processed:

**License Details:**
• License Type: General Business License
• Current Expiration: February 28, 2025
• Renewal Period: 2 years (through February 28, 2027)
• Renewal Fee: $85.00 ✅ Paid

**Renewal Status:**
✅ Application submitted and processed
✅ Fee payment confirmed
✅ Background verification complete
✅ Final approval granted

**New License Information:**
Your renewed license is now active and has been sent to your business address. Digital copy available immediately in your business portal.

**Confirmation Number:** BLR-2025-0012`,
    sources: ['Business License Renewal System'],
    operations: [],
    options: [
      { text: 'Download Digital License', action: 'download_digital_license', type: 'primary' },
      { text: 'Update Business Information', action: 'update_business_info', type: 'secondary' },
      { text: 'Set Renewal Reminder for 2027', action: 'set_renewal_reminder', type: 'secondary' }
    ],
    showFeedback: true
  },

  "submit_business_application": {
    text: `🚀 **Business License Application Submitted Successfully**

Your coordinated business application has been submitted to all required departments with confirmed receipt:

**Application Status - All Departments:**
✅ Business Services - Application #BLA-2025-0156 received
✅ Zoning Department - Commercial use pre-approved  
✅ Health Department - Inspection scheduled (Jan 20, 9:00 AM)
✅ Fire Department - Safety review scheduled (Jan 22, 2:00 PM)
✅ Utilities Division - Commercial upgrade scheduled (Jan 25, All day)

**Complete Application Timeline:**
• Health inspection: January 20, 2025 (9:00 AM) - Inspector: Sarah Chen
• Fire safety review: January 22, 2025 (2:00 PM) - Captain Mike Rodriguez  
• Utility upgrade: January 25, 2025 (8:00 AM - 5:00 PM)
• Final license approval: Estimated February 1, 2025

**Total Fees Paid:** $425 (Application: $150, Inspections: $125, Utility connection: $150)`,
    sources: ['Multi-Department Business Application System'],
    operations: [],
    options: [
      { text: 'Prepare for Inspections', action: 'prepare_inspections', type: 'primary' },
      { text: 'Track Application Progress', action: 'track_application_progress', type: 'secondary' },
      { text: 'Contact Inspection Team', action: 'contact_inspection_team', type: 'secondary' }
    ]
  },

  "schedule_all_inspections": {
    text: `📅 **All Inspections Scheduled and Coordinated**

Your business inspections have been successfully coordinated across all departments with confirmed appointments:

**Complete Inspection Schedule:**

🏥 **Health Department Inspection**
• Date: January 20, 2025 at 9:00 AM
• Inspector: Sarah Chen, Certified Health Inspector
• Duration: Approximately 2 hours  
• Focus Areas: Kitchen equipment, food storage, sanitation protocols
• Required Documentation: Equipment certifications, employee training records

🔥 **Fire Safety Inspection** 
• Date: January 22, 2025 at 2:00 PM
• Inspector: Captain Mike Rodriguez, Fire Prevention
• Duration: Approximately 1.5 hours  
• Focus Areas: Emergency exits, fire suppression systems, occupancy capacity
• Required Documentation: Emergency plans, equipment maintenance records

**Pre-Inspection Checklist Completed:**
✅ All equipment documentation gathered and verified
✅ Employee training records current and accessible
✅ Safety equipment operational and tested
✅ Inspection fees paid in full ($150 total)
✅ Calendar invites sent with inspector contact information`,
    sources: ['Multi-Department Inspection Coordination'],
    operations: [],
    options: [
      { text: 'Download Inspection Checklist', action: 'download_inspection_checklist', type: 'primary' },
      { text: 'Schedule Pre-Inspection Walkthrough', action: 'schedule_walkthrough', type: 'secondary' },
      { text: 'Contact Inspectors Directly', action: 'contact_inspectors', type: 'secondary' }
    ],
    showFeedback: true
  },

  // Level 2 responses (deeper engagement)
  "enable_auto_alerts": {
    text: `🤖 **Automated Billing Alert System Activated**

Your intelligent billing monitoring system is now fully operational:

**AI-Powered Monitoring Features:**
• Smart usage pattern analysis (learns your normal consumption)
• Predictive billing anomaly detection
• Seasonal adjustment calculations
• Weather-based usage correlation
• Leak detection alerts (consumption spikes during low-usage periods)

**Alert Triggers Now Active:**
• Usage increase >20% from historical average
• Bill amount variance >$40 from predicted amount
• Unusual consumption patterns (possible leaks)
• Payment due reminders (5, 3, and 1 day prior)

**Smart Learning Enabled:**
The system will learn your household patterns over the next 3 billing cycles to provide increasingly accurate predictions and reduce false alerts.

**First Alert Test:** You'll receive a test notification within 24 hours to confirm delivery.`,
    sources: ['AI Billing Monitoring System'],
    operations: [],
    options: [
      { text: 'View Learning Dashboard', action: 'view_learning_dashboard', type: 'primary' },
      { text: 'Add Seasonal Adjustments', action: 'add_seasonal_adjustments', type: 'secondary' }
    ],
    showFeedback: true
  },

  "test_alert_system": {
    text: `🧪 **Alert System Test Results**

Your billing alert system has been thoroughly tested across all notification channels:

**Test Results:**
📧 **Email Alerts**: ✅ Delivered successfully (received in 0.3 seconds)
📱 **SMS Alerts**: ✅ Delivered successfully (received in 1.2 seconds)  
🔔 **Push Notifications**: ✅ Delivered successfully (received in 0.8 seconds)
📞 **Voice Alerts** (for critical issues): ✅ System ready

**Test Scenarios Completed:**
• High usage alert simulation: ✅ Triggered correctly
• Payment reminder test: ✅ Delivered on schedule
• Emergency leak detection: ✅ Immediate notification sent
• System maintenance notice: ✅ Advance warning delivered

**Alert Performance Score: 98.5%**

Your alert system is functioning optimally. All notifications will be delivered reliably, and the system is monitoring your account 24/7 for any unusual activity.`,
    sources: ['Alert System Testing Platform'],
    operations: [],
    options: [
      { text: 'Set Quiet Hours', action: 'set_quiet_hours', type: 'secondary' },
      { text: 'Add Emergency Contacts', action: 'add_emergency_contacts', type: 'secondary' }
    ],
    showFeedback: true
  },

  "setup_auto_renewals": {
    text: `🔄 **Automatic Renewal System Configured**

Your city services have been enrolled in the automatic renewal program:

**Services Now on Auto-Renewal:**
✅ Business License - Next renewal: Feb 28, 2027 (60-day advance notice)
✅ Vehicle Registration - Auto-renews annually  
✅ Waste Management - Continuous service with annual rate updates
✅ Water Service - Account remains active with usage-based billing

**Auto-Payment Setup:**
• Payment method: Checking account ending in ****4892
• Backup payment: Credit card ending in ****3456
• Advance notification: 30 days before each renewal
• Receipt delivery: Email and postal mail

**Smart Renewal Features:**
• Price change notifications (>10% increase requires approval)
• Service upgrade recommendations based on usage
• Bundled service discounts automatically applied
• Priority customer service line access

**Estimated Annual Savings:** $125 in late fees and convenience charges`,
    sources: ['Automated Renewal Management System'],
    operations: [],
    options: [
      { text: 'Review Renewal Schedule', action: 'review_renewal_schedule', type: 'primary' },
      { text: 'Update Payment Methods', action: 'update_payment_methods', type: 'secondary' }
    ],
    showFeedback: true
  },

  "create_payment_calendar": {
    text: `📅 **Personalized Payment Calendar Created**

Your comprehensive city services payment calendar has been generated and synchronized:

**2025 Payment Schedule:**

**January 2025**
• Jan 15: Water Bill ($${MOCK_USER_ACCOUNT.accounts.water.balance}) - Auto-pay enabled

**February 2025**  
• Feb 28: Business License Renewal ($85) - Auto-renewal active

**March 2025**
• Mar 15: Vehicle Registration ($75 estimated)

**April 2025**
• Apr 30: Property Taxes ($3,200 estimated) - Payment plan available

**Calendar Integration:**
✅ Google Calendar events created
✅ Outlook calendar synchronized  
✅ Apple Calendar events added
✅ SMS reminders enabled (7 days, 3 days, 1 day before)

**Budget Planning Tools:**
• Monthly amount to save: $267 (spreads costs evenly)
• Largest single payment: Property taxes (April)
• Payment method optimization suggestions included
• Early payment discount opportunities highlighted`,
    sources: ['Financial Planning Integration System'],
    operations: [],
    options: [
      { text: 'Set Up Budget Alerts', action: 'setup_budget_alerts', type: 'primary' },
      { text: 'Explore Payment Plan Options', action: 'explore_payment_plans', type: 'secondary' }
    ],
    showFeedback: true
  }
};
