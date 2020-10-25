"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const jsonfile_1 = require("jsonfile");
const rest_api_client_1 = require("@kintone/rest-api-client");
const pullCustomization = (config, auth) => __awaiter(this, void 0, void 0, function* () {
    const client = new rest_api_client_1.KintoneRestAPIClient({
        baseUrl: "https://" + auth.domain,
        auth: {
            username: auth.username,
            password: auth.password,
        },
    });
    const fileList = yield client.app.getAppCustomize({ app: config.appID });
    fileList.desktop.js.forEach((resourceInfo, index) => __awaiter(this, void 0, void 0, function* () {
        if (resourceInfo.type === "URL") {
            config.uploadConfig.desktop.js[index] = resourceInfo.url;
        }
        else {
            config.uploadConfig.desktop.js[index] = `${config.appName}/source/js/${resourceInfo.file.name}`;
            var file = yield client.file.downloadFile({
                fileKey: resourceInfo.file.fileKey,
            });
            fs_1.writeFileSync(`${config.appName}/source/js/${resourceInfo.file.name}`, file);
        }
    }));
    fileList.desktop.css.forEach((resourceInfo, index) => __awaiter(this, void 0, void 0, function* () {
        if (resourceInfo.type === "URL") {
            config.uploadConfig.desktop.css[index] = resourceInfo.url;
        }
        else {
            config.uploadConfig.desktop.css[index] = `${config.appName}/source/css/${resourceInfo.file.name}`;
            var file = yield client.file.downloadFile({
                fileKey: resourceInfo.file.fileKey,
            });
            fs_1.writeFileSync(`${config.appName}/source/css/${resourceInfo.file.name}`, file);
        }
    }));
    jsonfile_1.writeFileSync(`${config.appName}/config.json`, config, { spaces: 4, EOL: "\r\n" });
});
exports.pullCustomization = pullCustomization;
//# sourceMappingURL=pullGenerator.js.map