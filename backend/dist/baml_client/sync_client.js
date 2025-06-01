/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/
import { toBamlError } from "@boundaryml/baml";
import { HttpRequest, HttpStreamRequest } from "./sync_request.js";
import { LlmResponseParser, LlmStreamParser } from "./parser.js";
import { DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME } from "./globals.js";
export class BamlSyncClient {
    runtime;
    ctxManager;
    bamlOptions;
    httpRequest;
    httpStreamRequest;
    llmResponseParser;
    llmStreamParser;
    bamlOptions;
    constructor(runtime, ctxManager, bamlOptions) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
        this.bamlOptions = bamlOptions;
        this.httpRequest = new HttpRequest(runtime, ctxManager);
        this.httpStreamRequest = new HttpStreamRequest(runtime, ctxManager);
        this.llmResponseParser = new LlmResponseParser(runtime, ctxManager);
        this.llmStreamParser = new LlmStreamParser(runtime, ctxManager);
        this.bamlOptions = bamlOptions || {};
    }
    withOptions(bamlOptions) {
        return new BamlSyncClient(this.runtime, this.ctxManager, bamlOptions);
    }
    /*
    * @deprecated NOT IMPLEMENTED as streaming must by async. We
    * are not providing an async version as we want to reserve the
    * right to provide a sync version in the future.
    */
    get stream() {
        throw new Error("stream is not available in BamlSyncClient. Use `import { b } from 'baml_client/async_client");
    }
    get request() {
        return this.httpRequest;
    }
    get streamRequest() {
        return this.httpStreamRequest;
    }
    get parse() {
        return this.llmResponseParser;
    }
    get parseStream() {
        return this.llmStreamParser;
    }
    ExtractResume(resume, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.callFunctionSync("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.callFunctionSync("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.callFunctionSync("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
export const b = new BamlSyncClient(DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX);
