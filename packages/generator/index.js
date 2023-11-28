#!/usr/bin/env ts-node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGenerate = exports.onManifest = void 0;
var generator_helper_1 = require("@prisma/generator-helper");
function onManifest() {
    return {
        defaultOutput: './types',
        prettyName: 'My Type Generator',
    };
}
exports.onManifest = onManifest;
function onGenerate(options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(JSON.stringify(options.dmmf.datamodel, null, 2));
            return [2 /*return*/];
        });
    });
}
exports.onGenerate = onGenerate;
(0, generator_helper_1.generatorHandler)({
    onManifest: onManifest,
    onGenerate: onGenerate,
});
var template = function (options) {
    var dmmf = options.dmmf;
    dmmf.datamodel.models.map(function (model) {
        return "\n      import { z } from 'zod';\n      \n      /////////////////////////////////////////\n      // ".concat(model.name.toUpperCase(), " SCHEMA\n      /////////////////////////////////////////\n      \n      export const ").concat(model.name, "Schema = z.object({\n        ").concat(model.fields
            .map(function (field) {
            return "".concat(field.name, ": ").concat(field.type).concat(field.isRequired ? '.nullish()' : '');
        })
            .join(',\n'), "\n        id: z.number().int(),\n        account: z.string(),\n        password: z.string().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/,'\u5BC6\u7801\u5FC5\u987B\u5305\u542B\u6570\u5B57\u4E0E\u5B57\u6BCD\u4E14\u5927\u4E8E6\u4F4D\u5C0F\u4E8E15\u4F4D'),\n        email: z.string().nullish(),\n        phoneNumber: z.string().nullish(),\n        createAt: z.coerce.date(),\n        updateAt: z.coerce.date(),\n        deleteAt: z.coerce.date().nullish(),\n        version: z.number().int(),\n      })\n      \n      export type ").concat(model.name, " = z.infer<typeof ").concat(model.name, "Schema>\n      \n      /////////////////////////////////////////\n      // ").concat(model.name.toUpperCase(), " PARTIAL SCHEMA\n      /////////////////////////////////////////\n      \n      export const ").concat(model.name, "PartialSchema = ").concat(model.name, "Schema.partial()\n      \n      export type ").concat(model.name, "Partial = z.infer<typeof ").concat(model.name, "PartialSchema>\n      \n      /////////////////////////////////////////\n      // ").concat(model.name.toUpperCase(), " OPTIONAL DEFAULTS SCHEMA\n      /////////////////////////////////////////\n      \n      export const ").concat(model.name, "OptionalDefaultsSchema = ").concat(model.name, "Schema.merge(z.object({\n        ").concat(model.fields
            .filter(function (field) { return !field.isRequired; })
            .map(function (field) {
            return "".concat(field.name, ": ").concat(field.type).concat(field.isRequired ? '.optional()' : '');
        }), "\n      }))\n      \n      export type ").concat(model.name, "OptionalDefaults = z.infer<typeof ").concat(model.name, "OptionalDefaultsSchema>\n      \n      export default ").concat(model.name, "Schema;\n      ");
    });
};
