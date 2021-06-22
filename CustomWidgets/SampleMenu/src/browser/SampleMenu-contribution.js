"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceholderMenuNode = exports.SampleMenuContribution = exports.CustomSubMenu = exports.SampleCommandContribution = void 0;
var common_1 = require("@theia/core/lib/common");
var inversify_1 = require("@theia/core/shared/inversify");
var SampleCommand = {
    id: 'sample-command',
    label: 'Widget 1'
};
var SampleCommand2 = {
    id: 'sample-command2',
    label: 'Options'
};
var SampleCommand3 = {
    id: 'sample-command3',
    label: 'Widget 2'
};
var SampleCommandContribution = /** @class */ (function () {
    function SampleCommandContribution() {
    }
    SampleCommandContribution.prototype.registerCommands = function (commands) {
        commands.registerCommand(SampleCommand, {
            execute: function () {
                alert('A widget will pop up (Widget 1)');
            }
        });
        commands.registerCommand(SampleCommand2, {
            execute: function () {
                alert('A widget will pop up (Options)');
            }
        });
        commands.registerCommand(SampleCommand3, {
            execute: function () {
                alert('A widget will pop up (Widget 3)');
            }
        });
    };
    SampleCommandContribution = __decorate([
        inversify_1.injectable()
    ], SampleCommandContribution);
    return SampleCommandContribution;
}());
exports.SampleCommandContribution = SampleCommandContribution;
var CustomSubMenu;
(function (CustomSubMenu) {
    CustomSubMenu.subMenuPath = __spreadArray(__spreadArray([], __read(common_1.MAIN_MENU_BAR)), ['sample-menu']);
})(CustomSubMenu = exports.CustomSubMenu || (exports.CustomSubMenu = {}));
var SampleMenuContribution = /** @class */ (function () {
    function SampleMenuContribution() {
    }
    SampleMenuContribution.prototype.registerMenus = function (menus) {
        menus.registerSubmenu(CustomSubMenu.subMenuPath, 'MD3i', {
            order: '2' // that should put the menu right next to the File menu
        });
        menus.registerMenuAction(CustomSubMenu.subMenuPath, {
            commandId: SampleCommand.id,
            order: '0'
        });
        var subSubMenuPath = __spreadArray(__spreadArray([], __read(CustomSubMenu.subMenuPath)), ['sample-sub-menu']);
        menus.registerSubmenu(subSubMenuPath, 'Mapper', { order: '2' });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand3.id,
            order: '1'
        });
        menus.registerMenuAction(subSubMenuPath, {
            commandId: SampleCommand2.id,
            order: '2'
        });
        /*const placeholder = new PlaceholderMenuNode([...subSubMenuPath, 'placeholder'].join('-'), 'Placeholder', { order: '0' });
        menus.registerMenuNode(subSubMenuPath, placeholder);*/
    };
    SampleMenuContribution = __decorate([
        inversify_1.injectable()
    ], SampleMenuContribution);
    return SampleMenuContribution;
}());
exports.SampleMenuContribution = SampleMenuContribution;
/**
 * Special menu node that is not backed by any commands and is always disabled.
 */
var PlaceholderMenuNode = /** @class */ (function () {
    function PlaceholderMenuNode(id, label, options) {
        this.id = id;
        this.label = label;
        this.options = options;
    }
    Object.defineProperty(PlaceholderMenuNode.prototype, "icon", {
        get: function () {
            var _a;
            return (_a = this.options) === null || _a === void 0 ? void 0 : _a.iconClass;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PlaceholderMenuNode.prototype, "sortString", {
        get: function () {
            var _a;
            return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.order) || this.label;
        },
        enumerable: false,
        configurable: true
    });
    return PlaceholderMenuNode;
}());
exports.PlaceholderMenuNode = PlaceholderMenuNode;
/*export const bindSampleMenu = (bind: interfaces.Bind) => {
    bind(CommandContribution).to(SampleCommandContribution).inSingletonScope();
    bind(MenuContribution).to(SampleMenuContribution).inSingletonScope();
};*/
//# sourceMappingURL=SampleMenu-contribution.js.map