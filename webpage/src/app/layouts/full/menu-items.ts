import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    permission?: string;
    value: string;
}

export interface Separator {
    name: string;
    permission?: string;
    type?: string;
}

export interface SubChildren {
    state: string;
    name: string;
    permission?: string;
    type?: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    permission?: string;
    action?: string;
    title?: string;
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    permission?: string;
    action?: string;
    title?: string;
    badge?: BadgeItem[];
    separator?: Separator[];
    children?: ChildrenItems[];
}

// let MENUITEMS: Menu[] = [];
const MENUITEMS: Menu[] = [
    {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'sub',
        icon: 'dashboard',
        permission: 'dashboard',
        children: [
            {
                state: 'requester',
                name: 'Dashboard SCI',
                type: 'link',
                permission: 'dashboard',
                action: 'Solicitante',
                title: 'Dashboard SCI'
            },
            {
                state: 'er',
                name: 'Dashboard RE',
                type: 'link',
                permission: 'dashboard.re',
                action: 'Solicitante',
                title: 'Dashboard SCI'
            },
        ]
    },
    {
        state: 'library',
        name: 'Biblioteca',
        type: 'link',
        icon: 'account_tree',
        permission: 'protocol.step.list',
        action: 'Solicitante',
        title: 'Biblioteca de Arquivos'
    },
    {
        state: 'register',
        name: 'Cadastros',
        type: 'sub',
        icon: 'list',
        permission: 'protocol.list',
        children: [
            {
                state: 'requester',
                name: 'Protocolos',
                type: 'link',
                permission: 'protocol.list',
                action: 'Solicitante',
                title: 'Cadastros > Protocolos'
            },
            {
                state: 'demandant',
                name: 'Demandantes',
                type: 'link',
                permission: 'protocol.demandant.list',
                action: 'Solicitante',
                title: 'Cadastros > Demandante'
            },
            {
                state: 'holder',
                name: 'Detentoras',
                type: 'link',
                permission: 'protocol.holding.list',
                action: 'Solicitante',
                title: 'Cadastros > Dententora'
            },
            {
                state: 'holiday',
                name: 'Feriados',
                type: 'link',
                permission: 'holiday.list',
                action: 'Solicitante',
                title: 'Cadastros > Feriados'
            },
            {
                state: 'provider',
                name: 'Fornecedores',
                type: 'link',
                permission: 'protocol.provider.list',
                action: 'Solicitante',
                title: 'Cadastros > Fornecedores'
            },
            {
                state: 'project',
                name: 'Projetos',
                type: 'link',
                permission: 'protocol.project.list',
                action: 'Solicitante',
                title: 'Cadastros > Projetos'
            },
            {
                state: 'target',
                name: 'Target',
                type: 'link',
                permission: 'target.list',
                action: 'Solicitante',
                title: 'Cadastros > Target'
            },
            {
                state: 'user',
                name: 'Usuário',
                type: 'link',
                permission: 'user.list',
                action: 'Solicitante',
                title: 'Cadastros > Usuário'
            },
        ]
    },
    {
        state: 'import',
        name: 'Importação',
        type: 'sub',
        icon: 'description',
        permission: 'protocol.import',
        children: [
            {
                state: 'masssive-load',
                name: 'Carga Massiva',
                type: 'link',
                permission: 'protocol.import',
                action: 'Solicitante',
                title: 'Importação > Carga Massiva'
            },
            {
                state: 'plop-access',
                name: 'PLOP ACESSO',
                type: 'link',
                permission: 'protocol.import',
                action: 'Solicitante',
                title: 'Importação > PLOP ACESSO'
            },
            {
                state: 'plop-tx',
                name: 'PLOP TX MW',
                type: 'link',
                permission: 'protocol.import',
                action: 'Solicitante',
                title: 'Importação > PLOP TX MW'
            },
            {
                state: 'spazio',
                name: 'SPAZIO',
                type: 'link',
                permission: 'protocol.import',
                action: 'Solicitante',
                title: 'Importação > SPAZIO'
            },
        ]
    },
    {
        state: 'production',
        name: 'Produção',
        type: 'sub',
        icon: 'trending_up',
        permission: 'dashboard.production_panel',
        children: [
            {
                state: 'panel',
                name: 'Painel de Produção SCI',
                type: 'link',
                permission: 'dashboard.production_panel',
                action: 'Solicitante',
                title: 'Produção > Painel de Produção SCI'
            },
            {
                state: 'region',
                name: 'SCI por Regional',
                type: 'link',
                permission: 'dashboard.production_panel',
                action: 'Solicitante',
                title: 'Produção > Produção por Regional'
            },
            {
                state: 'users',
                name: 'SCI por Usuários',
                type: 'link',
                permission: 'dashboard.production_panel',
                action: 'Solicitante',
                title: 'Produção > Produção por Usuários'
            },
            {
                state: 're-production-panel',
                name: 'RE por Usuários',
                type: 'link',
                permission: 'dashboard.re_production_panel',
                action: 'Solicitante',
                title: 'Relatórios > Painel de Produção RE'
            },
        ]
    },
    {
        state: 'reports',
        name: 'Relatórios SCI',
        type: 'sub',
        icon: 'insert_chart_outlined',
        permission: 'dashboard.reports',
        children: [
            {
                state: 'canceled-by-region',
                name: 'Cancelados por Motivo',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > SCI\' Canceladas por Motivo'
            },
            {
                state: 'loading-table-protocols',
                name: 'Carregamento',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > Relatório por Tabela de Carregamento'
            },
            {
                state: 'protocols-by-address-id',
                name: 'Consulta Carregamento',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > Consulta de Carregamento por Endereço ID'
            },
            {
                state: 'review-by-reason',
                name: 'Em Revisão por Motivo',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > SCI\'s em Revisão por Motivo'
            },
            {
                state: 'approval-lighthouse',
                name: 'Farol de Aprovações',
                type: 'link',
                permission: 'dashboard.approval_lighthouse',
                action: 'Solicitante',
                title: 'Relatórios > Farol de Aprovações'
            },
            {
                state: 'financial-impact',
                name: 'Impacto das Aprovações',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > Impacto Financeiro das Aprovações'
            },
            {
                state: 'yearly-periodic-production-requester',
                name: 'Produção Anual SCI\'s',
                type: 'link',
                permission: 'dashboard.production',
                action: 'Solicitante',
                title: 'Relatórios > Produção Anual SCI\'s'
            },
            {
                state: 'automatic-reports',
                name: 'Relatórios Automáticos',
                type: 'link',
                permission: 'dashboard.protocols_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > Relatórios Automáticos'
            },
        ]
    },
    {
        state: 'aging',
        name: 'Relatórios Aging SCI',
        type: 'sub',
        icon: 'access_time',
        permission: 'aging',
        children: [
            {
                state: 'under-review-by-holding',
                name: 'SCI\'s em Análise',
                type: 'link',
                permission: 'aging',
                action: 'Solicitante',
                title: 'AGING > SCI\'s em Análise - AGING Detalhado por Detentora'
            },
            {
                state: 'approve-of-value',
                name: 'SCI\'s Em Aprovação de Valor',
                type: 'link',
                permission: 'aging',
                action: 'Solicitante',
                title: 'AGING > SCI\'s em Aprovação de Valor - AGING Detalhado por Regional'
            },
            {
                state: 'review-by-region',
                name: 'SCI\'s em Revisão',
                type: 'link',
                permission: 'aging',
                action: 'Solicitante',
                title: 'AGING > SCI\'s em Revisão - AGING Detalhado por Regional'
            },
            {
                state: 're-under-review-by-holding',
                name: 'RE\'s em Análise',
                type: 'link',
                permission: 'aging',
                action: 'Solicitante',
                title: 'AGING > RE\'s em Análise - AGING Detalhado por Detentora'
            },
            {
                state: 're-review-by-region',
                name: 'RE\'s em Revisão',
                type: 'link',
                permission: 'aging',
                action: 'Solicitante',
                title: 'AGING > RE\'s em Revisão - AGING Detalhado por Regional'
            },
        ]
    },
    {
        state: 'reports_er',
        name: 'Relatórios RE',
        type: 'sub',
        icon: 'analytics',
        permission: 're_weekly_evolution_report',
        children: [
            {
                state: 're-weekly-evolution',
                name: 'Evolução Semanal RE',
                type: 'link',
                permission: 're_weekly_evolution_report',
                action: 'Solicitante',
                title: 'Relatórios > RE\'s - Evolução Semanal RE'
            },
            {
                state: 're-by-reason',
                name: 'Motivo de Devolução RE',
                type: 'link',
                permission: 'dashboard.re_distribution_by_reason',
                action: 'Solicitante',
                title: 'Relatórios > RE\'s - Motivo de Devolução RE'
            },
            {
                state: 're-technical-offenders',
                name: 'Ofensores Técnicos',
                type: 'link',
                permission: 'dashboard.re_technical_offenders',
                action: 'Solicitante',
                title: 'Relatórios > Ofensores Técnicos'
            },
            {
                state: 're-yearly-periodic-production',
                name: 'Produção Anual RE\'s',
                type: 'link',
                permission: 'dashboard.re_yearly_periodic_production',
                action: 'Solicitante',
                title: 'Relatórios > Produção Anual RE\'s'
            },
            {
                state: 're-by-region-approved-disapproved',
                name: 'RE\'s por Regional',
                type: 'link',
                permission: 'dashboard.re_by_region_approved_disapproved',
                action: 'Solicitante',
                title: 'Relatórios > Painel de Aprovação por Regional'
            },
            {
                state: 're-distribution-by-status',
                name: 'RE\'s por Status',
                type: 'link',
                permission: 'dashboard.re_distribution_by_status',
                action: 'Solicitante',
                title: 'Relatórios > RE\'s - por Status'
            },
            {
                state: 're-total-protocols-sent-approved',
                name: 'SCI\'s vs RE\'s',
                type: 'link',
                permission: 'dashboard.re_total_protocols_sent_approved',
                action: 'Solicitante',
                title: 'Relatórios > SCI\'s Aprovada vs RE\'s Aprovada vs RE\'s Enviada'
            },
        ]
    },
    {
        state: 'aging_er',
        name: 'Relatórios Aging RE',
        type: 'sub',
        icon: 'watch_later',
        permission: 're.aging',
        children: [
            {
                state: 'aging_er_step',
                name: 'Aging RE',
                type: 'link',
                permission: 're.aging',
                action: 'Solicitante',
                title: 'Relatórios > RE\'s - Aging RE'
            },
        ]
    },
    {
        state: 're',
        name: 'RE',
        type: 'sub',
        icon: 'engineering',
        permission: 're.list',
        action: 'RE',
        title: 'RE',
        children: [
            {
                state: 'analysis_performed',
                name: 'RE - visão por Análise',
                type: 'link',
                permission: 're_by_analysis_performed.list',
                action: 'er_by_analysis_performed',
                title: 'Kit'
            },
            {
                state: 'kit',
                name: 'RE - visão por OC',
                type: 'link',
                permission: 're.list',
                action: 'kit',
                title: 'Kit'
            },
            {
                state: 'checklist',
                name: 'Checklist',
                type: 'link',
                permission: 're.checklist.list',
                action: 'checklist',
                title: 'Checklist'
            },
            {
                state: 'vendor',
                name: 'Vendor',
                type: 'link',
                permission: 're.vendor.list',
                action: 'vendor',
                title: 'Vendor'
            },
            {
                state: 'focal',
                name: 'Focal',
                type: 'link',
                permission: 're.focal.list',
                action: 'focal',
                title: 'Focal'
            },
            {
                state: 'target',
                name: 'Target',
                type: 'link',
                permission: 're.target.list',
                action: 'RE',
                title: 'RE > Target'
            },
        ]
    },
    {
        state: 'settings',
        name: 'Configurações',
        type: 'link',
        icon: 'settings_applications',
        permission: 'config.list',
        action: 'Solicitante',
        title: 'Configurações'
    },
];

const ASSIGNOR_MENU: Menu[] = [
    {
        state: 'dashboard/assignor',
        name: 'Dashboard',
        type: 'link',
        icon: 'dashboard',
        permission: 'dashboard',
        action: 'Cedente',
        title: 'Dashboard'
    },
    {
        state: 'register',
        name: 'Cadastros',
        type: 'sub',
        icon: 'list',
        permission: 'assignor_protocol.list',
        children: [
            {
                state: 'assignor',
                name: 'Protocolos',
                type: 'link',
                permission: 'assignor_protocol.list',
                action: 'Cedente',
                title: 'Cadastros > Protocolos'
            },
        ]
    },
    {
        state: 'reports',
        name: 'Relatórios',
        type: 'sub',
        icon: 'insert_chart_outlined',
        permission: 'dashboard.protocols_by_reason',
        children: [
            {
                state: 'yearly-periodic-production-assignor',
                name: 'Produção Anual',
                type: 'link',
                permission: 'dashboard.production',
                action: 'Cedente',
                title: 'Relatórios > Produção Anual'
            },
        ]
    },
];

@Injectable({
  providedIn: 'root'
})
export class MenuItems {

    getMenuitem(): Menu[] {
        return MENUITEMS;
    }

    // setMenu(system: string): void {
    //     if (system === 'assignor') {
    //         MENUITEMS = ASSIGNOR_MENU;
    //     } else {
    //         MENUITEMS = REQUESTER_MENU;
    //     }
    // }
}
