import { ContainerModule } from 'inversify';
import { GettingStarted2Widget } from './GettingStarted2-widget';
import { GettingStarted2Contribution } from './GettingStarted2-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, GettingStarted2Contribution);
    bind(FrontendApplicationContribution).toService(GettingStarted2Contribution);
    bind(GettingStarted2Widget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: GettingStarted2Widget.ID,
        createWidget: () => ctx.container.get<GettingStarted2Widget>(GettingStarted2Widget)
    })).inSingletonScope();
});
