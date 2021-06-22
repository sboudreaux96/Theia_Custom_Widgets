/********************************************************************************
 * Copyright (C) 2020 TORO Limited and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MenuNode, SubMenuOptions } from '@theia/core/lib/common';
export declare class SampleCommandContribution implements CommandContribution {
    registerCommands(commands: CommandRegistry): void;
}
export declare namespace CustomSubMenu {
    const subMenuPath: string[];
}
export declare class SampleMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void;
}
/**
 * Special menu node that is not backed by any commands and is always disabled.
 */
export declare class PlaceholderMenuNode implements MenuNode {
    readonly id: string;
    readonly label: string;
    protected options?: SubMenuOptions | undefined;
    constructor(id: string, label: string, options?: SubMenuOptions | undefined);
    get icon(): string | undefined;
    get sortString(): string;
}
//# sourceMappingURL=SampleMenu-contribution.d.ts.map