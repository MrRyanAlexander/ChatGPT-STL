
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
  // Water Billing Dispute Follow-ups
  "download_dispute_report": {
    text: `📄 **Dispute Resolution Report Generated**

Your comprehensive dispute resolution report has been prepared and is ready for download. This report includes:

• Complete billing history analysis
• Meter reading verification documents  
• Credit approval documentation ($127.50)
• Future billing protection recommendations

The report has been saved to your account and sent to your email address. This documentation can be used for your records or if you need to reference this dispute resolution in the future.

**Next Steps:**
- Credit will appear on your next bill (due January 15, 2025)
- New billing alerts have been recommended to prevent future issues
- Your case reference number is: WTR-DISP-2024-1201`,
    sources: ['Water Department Dispute Resolution System'],
    operations: [],
    options: [],
    showFeedback: true
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
• Email notifications: Enabled
• SMS alerts: Enabled  
• Mobile app push notifications: Enabled

These alerts will help you catch potential billing issues early and ensure accurate charges on your account. You can modify these settings anytime through your online account portal.`,
    sources: ['Water Department Alert System'],
    operations: [],
    options: [],
    showFeedback: true
  },

  // Service Status Follow-ups
  "view_service_report": {
    text: `📊 **Detailed City Services Report**

Your comprehensive service status report has been generated:

**Critical Actions Needed:**
1. Business License Renewal (Due: Feb 28, 2025) - $85 fee
2. Update emergency contact information across 3 departments

**Upcoming Due Dates:**
• Water bill: January 15, 2025 ($${MOCK_USER_ACCOUNT.accounts.water.balance})
• Property taxes: April 30, 2025 ($3,200 estimated)
• Vehicle registration: March 15, 2025
• Voter registration: Confirmed current

**Service Performance:**
• Payment history: 100% on-time last 12 months
• Service interruptions: 0 reported issues
• Account status: Excellent standing

The full report includes 24 months of service history and has been saved to your resident portal.`,
    sources: ['Multi-Department Service Integration'],
    operations: [],
    options: [
      { text: 'Renew Business License Now', action: 'renew_business_license', type: 'primary' },
      { text: 'Update Emergency Contacts', action: 'update_emergency_contacts', type: 'secondary' }
    ]
  },

  "renew_business_license": {
    text: `🏢 **Business License Renewal Process Initiated**

Your business license renewal has been successfully started:

**License Details:**
• License Type: General Business License
• Current Expiration: February 28, 2025
• Renewal Period: 2 years
• Renewal Fee: $85.00

**Renewal Status:**
✅ Application submitted
✅ Fee payment processed
✅ Background verification complete
⏳ Final approval pending (typically 3-5 business days)

**What's Next:**
Your renewed license will be mailed to your business address and available for download in your business portal. You'll receive email confirmation once the renewal is complete.

**Confirmation Number:** BLR-2025-0012`,
    sources: ['Business License Renewal System'],
    operations: [],
    options: [],
    showFeedback: true
  },

  // Business Application Follow-ups
  "submit_business_application": {
    text: `🚀 **Business License Application Submitted Successfully**

Your coordinated business application has been submitted to all required departments:

**Application Status:**
✅ Business Services - Application received
✅ Zoning Department - Commercial use approved  
✅ Health Department - Inspection scheduled (Jan 20)
✅ Fire Department - Safety review scheduled (Jan 22)
✅ Utilities - Commercial upgrade scheduled (Jan 25)

**Application Timeline:**
• Health inspection: January 20, 2025 (9:00 AM)
• Fire safety review: January 22, 2025 (2:00 PM)  
• Utility upgrade: January 25, 2025 (All day)
• Final approval: Estimated February 1, 2025

**Application Reference:** BLA-2025-0156

You'll receive individual confirmations from each department and can track progress through your business portal.`,
    sources: ['Multi-Department Business Application System'],
    operations: [],
    options: [],
    showFeedback: true
  },

  "schedule_all_inspections": {
    text: `📅 **All Inspections Scheduled Successfully**

Your business inspections have been coordinated across all departments:

**Inspection Schedule:**
🏥 **Health Department Inspection**
• Date: January 20, 2025 at 9:00 AM
• Inspector: Sarah Chen, Health Inspector
• Duration: Approximately 2 hours
• Requirements: Kitchen equipment, food storage, sanitation

🔥 **Fire Safety Inspection** 
• Date: January 22, 2025 at 2:00 PM
• Inspector: Captain Mike Rodriguez
• Duration: Approximately 1.5 hours  
• Requirements: Emergency exits, fire suppression, capacity

**Preparation Checklist:**
✅ All equipment documentation ready
✅ Employee training records available
✅ Safety equipment operational
✅ Inspection fees paid ($150 total)

Calendar invites have been sent to your email with inspector contact information.`,
    sources: ['Multi-Department Inspection Coordination'],
    operations: [],
    options: [],
    showFeedback: true
  },

  // Property Assessment Follow-ups
  "view_assessment_report": {
    text: `📈 **Detailed Property Assessment Report**

Your comprehensive property assessment analysis:

**Assessment Breakdown:**
• Land Value: $185,000 (48%)
• Building Value: $200,000 (52%)
• Total Assessment: $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}

**Recent Improvements Impact:**
• Kitchen renovation (2023): +$25,000 value
• HVAC system upgrade: +$8,000 value  
• Bathroom updates: +$7,000 value

**Market Comparison Analysis:**
• Your assessment: $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}
• Neighborhood median: $395,000
• Assessment ratio: 98.7% of market value
• Your position: Fairly assessed

**5-Year Assessment History:**
2020: $320,000 | 2021: $335,000 | 2022: $365,000 | 2023: $385,000 | 2024: $${MOCK_USER_ACCOUNT.accounts.property.assessment.toLocaleString()}

The detailed report with comparables has been saved to your property records.`,
    sources: ['County Assessment Analysis System'],
    operations: [],
    options: [],
    showFeedback: true
  },

  "appeal_assessment": {
    text: `⚖️ **Assessment Appeal Process Information**

Based on our analysis, here's your appeal guidance:

**Appeal Likelihood Assessment:**
• Current assessment appears market-accurate
• Recent improvements justify increase
• Neighborhood comparables support valuation
• **Recommendation:** Appeal unlikely to succeed

**If You Choose to Appeal:**
• Filing deadline: March 31, 2025
• Filing fee: $25 (refundable if successful)
• Required evidence: Recent appraisals, comparable sales
• Process timeline: 60-90 days

**Alternative Options:**
• Property tax exemptions review (senior, disability, veteran)
• Payment plan setup (spread payments over 12 months)
• Property improvements review (ensure all counted)

**Assessment Appeal Form:** Available in your property portal

Given the analysis showing your assessment is fair and market-accurate, you may want to consider payment plan options instead.`,
    sources: ['County Assessment Appeal System'],
    operations: [],
    options: [
      { text: 'Setup Payment Plan Instead', action: 'setup_payment_plan', type: 'primary' },
      { text: 'Check Exemption Eligibility', action: 'check_exemptions', type: 'secondary' }
    ]
  },

  "setup_payment_plan": {
    text: `💳 **Property Tax Payment Plan Established**

Your property tax payment plan has been successfully set up:

**Payment Plan Details:**
• Total amount: $3,200 (estimated annual tax)
• Monthly payments: $266.67
• Plan duration: 12 months
• First payment due: February 15, 2025
• Auto-pay: Enabled from checking account

**Payment Schedule:**
• February 15: $266.67 (includes $25 setup fee)
• March 15 - January 15: $266.67/month
• No interest charges with on-time payments
• 10-day grace period each month

**Benefits:**
✅ Avoid large lump sum payment
✅ No interest with on-time payments  
✅ Automatic payment reminders
✅ Can pay ahead anytime without penalty

**Confirmation Number:** PTP-2025-0089

Your first payment will be automatically deducted on February 15, 2025.`,
    sources: ['Property Tax Payment System'],
    operations: [],
    options: [],
    showFeedback: true
  }
};
