import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { AgentDashboardComponent } from '../../pages/agent/agent-dashboard.component'; // Nouveau composant
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    {path: 'adherent',      loadChildren: () => import('../../pages/adherent/adherent.module').then(m => m.AdherentModule) },
  { 
    path: 'agent', 
    loadChildren: () => import('../../pages/agent/agent.module').then(m => m.AgentModule) 
  }, 
    { path: 'user',           component: UserComponent },
    { path: 'agents', component: AgentDashboardComponent }, // Nouvelle route
    // {path : 'agent', loadChildren: () => import('../../pages/agent/agent.module').then(m => m.AgentModule)},
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
