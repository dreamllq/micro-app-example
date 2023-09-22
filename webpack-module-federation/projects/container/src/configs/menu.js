import { i18n } from '@alsi/micro-framework-sdk';
import { appsData } from '@alsi/micro-framework-sdk';

export default [
  {
    'key': 'SYS',
    'label': i18n.global.t('sys.menuLabel'),
    'icon': 'aps-icon-setting',
    'children': [
      appsData.menu.role,
      appsData.menu.user,
      appsData.menu.site,
      appsData.menu.message,
      appsData.menu.myMessage,
      appsData.menu.cronJob
    ]
  },
  {
    'key': 'MDM',
    'label': i18n.global.t('mdm.menuLabel'),
    'icon': 'aps-icon-Basicdata',
    'children': [
      appsData.menu.generalCode,
      appsData.menu.materialDictionary,
      appsData.menu.materialMasterData,
      appsData.menu.productFamily,
      appsData.menu.bomManagement,
      appsData.menu.workshop,
      appsData.menu.resourceManagement,
      appsData.menu.resourceGroupManagement,
      appsData.menu.warehouse,
      appsData.menu.storageManagement,
      appsData.menu.customer,
      appsData.menu.supplierManagement,
      appsData.menu.encodingRules,
      appsData.menu.unitConvert,
      appsData.menu.currencyConversion,
      appsData.menu.leadTime,
      appsData.menu.shiftManagement,
      appsData.menu.planCalendar,
      appsData.menu.process,
      appsData.menu.routing,
      appsData.menu.makeRouting,
      appsData.menu.processFlow
    ]
  },
  {
    'key': 'ORDER',
    'label': i18n.global.t('order.menuLabel'),
    'icon': 'aps-icon-order',
    'children': [appsData.menu.salesOrder, appsData.menu.forecastOrder]
  },
  {
    'key': 'SOP',
    'label': i18n.global.t('sop.menuLabel'),
    'icon': 'aps-icon-sop',
    'children': [
      appsData.menu.planningStory,
      appsData.menu.planningModel,
      appsData.menu.planningCalculation,
      appsData.menu.planningView,
      appsData.menu.accessRules,
      appsData.menu.supplyChainNetwork
    ]
  },
  {
    'key': 'SCP',
    'label': i18n.global.t('scp.menuLabel'),
    'icon': 'aps-icon-Supplychain',
    'children': [
      appsData.menu.supplyRule,
      appsData.menu.planCalculationRule,
      appsData.menu.planOrderRule,
      appsData.menu.planOrder,
      appsData.menu.requirementPlanning
    ]
  },
  {
    'key': 'DPS',
    'label': i18n.global.t('dps.menuLabel'),
    'icon': 'aps-icon-production',
    'children': [
      appsData.menu.schedulingParametersSolution,
      appsData.menu.productBom,
      appsData.menu.schedulingTask,
      appsData.menu.schedulingOrder,
      appsData.menu.mainResourceGantt,
      appsData.menu.orderGantt,
      appsData.menu.progress,
      appsData.menu.report
    ]
  },
  {
    'key': 'interface-platform',
    'label': i18n.global.t('interfacePlatform.menuLabel'),
    'icon': 'aps-icon-production',
    children: [appsData.menu.management, appsData.menu.pushLog]
  },
  {
    'key': 'customization',
    'label': i18n.global.t('customization.menuLabel'),
    'icon': 'aps-icon-setting',
    'children': [appsData.menu.meterReview]
  }
];