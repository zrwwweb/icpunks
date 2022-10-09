"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.downloadFile = exports.downloadUrl = exports.isFile = exports.binary = exports.binaryPath = exports.ecRootDir = exports.getReleaseNameForCurrentPlatform = exports.arch = exports.platform = exports.getReleaseArchiveNameForCurrentPlatform = void 0;
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var https_proxy_agent_1 = require("https-proxy-agent");
var getReleaseArchiveNameForCurrentPlatform = function () {
    return exports.getReleaseNameForCurrentPlatform() + ".tar.gz";
};
exports.getReleaseArchiveNameForCurrentPlatform = getReleaseArchiveNameForCurrentPlatform;
var platform = function () {
    var currentPlatform = os.platform();
    if (currentPlatform === "win32") {
        return "windows";
    }
    else {
        return currentPlatform;
    }
};
exports.platform = platform;
var arch = function () {
    var currentArch = os.arch();
    if (currentArch === "x32") {
        return "386";
    }
    else if (currentArch === "x64") {
        return "amd64";
    }
    return currentArch;
};
exports.arch = arch;
var getReleaseNameForCurrentPlatform = function () {
    return "ec-" + exports.platform() + "-" + exports.arch() + (exports.platform() === "windows" ? ".exe" : "");
};
exports.getReleaseNameForCurrentPlatform = getReleaseNameForCurrentPlatform;
var ecRootDir = function () {
    return __dirname + "/..";
};
exports.ecRootDir = ecRootDir;
var binaryPath = function () {
    return exports.ecRootDir() + "/bin";
};
exports.binaryPath = binaryPath;
var binary = function () {
    return exports.binaryPath() + "/" + exports.getReleaseNameForCurrentPlatform();
};
exports.binary = binary;
var isFile = function (path) {
    try {
        fs.statSync(path).isFile();
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isFile = isFile;
var downloadUrl = function (version, archiveName) {
    var releaseUrl;
    releaseUrl =
        "https://github.com/editorconfig-checker/editorconfig-checker/releases/download/";
    return releaseUrl + "/" + version + "/" + archiveName;
};
exports.downloadUrl = downloadUrl;
var downloadFile = function (url, dest) {
    if (exports.isFile(dest)) {
        fs.unlinkSync(dest);
    }
    var proxy = process.env.https_proxy || process.env.http_proxy || "";
    return node_fetch_1.default(url, {
        agent: proxy ? new https_proxy_agent_1.HttpsProxyAgent(proxy) : null,
    }).then(function (res) { return res.body.pipe(fs.createWriteStream(dest)); });
};
exports.downloadFile = downloadFile;
var removeFile = function (path) {
    fs.unlinkSync(path);
    return;
};
exports.removeFile = removeFile;
