import { ContainerModule } from 'inversify';
import { PropertyViewWidget } from './PropertyView-widget';
import { PropertyViewContribution } from './PropertyView-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, PropertyViewContribution);
    bind(FrontendApplicationContribution).toService(PropertyViewContribution);
    bind(PropertyViewWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: PropertyViewWidget.ID,
        createWidget: () => ctx.container.get<PropertyViewWidget>(PropertyViewWidget)
    })).inSingletonScope();
});
