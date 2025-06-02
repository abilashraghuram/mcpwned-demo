/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/
import { toBamlError, BamlStream } from "@boundaryml/baml";
import { AsyncHttpRequest, AsyncHttpStreamRequest } from "./async_request.js";
import { LlmResponseParser, LlmStreamParser } from "./parser.js";
import { DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME } from "./globals.js";
export class BamlAsyncClient {
    runtime;
    ctxManager;
    streamClient;
    httpRequest;
    httpStreamRequest;
    llmResponseParser;
    llmStreamParser;
    bamlOptions;
    constructor(runtime, ctxManager, bamlOptions) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
        this.streamClient = new BamlStreamClient(runtime, ctxManager, bamlOptions);
        this.httpRequest = new AsyncHttpRequest(runtime, ctxManager);
        this.httpStreamRequest = new AsyncHttpStreamRequest(runtime, ctxManager);
        this.llmResponseParser = new LlmResponseParser(runtime, ctxManager);
        this.llmStreamParser = new LlmStreamParser(runtime, ctxManager);
        this.bamlOptions = bamlOptions || {};
    }
    withOptions(bamlOptions) {
        return new BamlAsyncClient(this.runtime, this.ctxManager, bamlOptions);
    }
    get stream() {
        return this.streamClient;
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
    async ExtractResume(resume, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = await this.runtime.callFunction("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = await this.runtime.callFunction("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateSixPlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = await this.runtime.callFunction("GenerateSixPlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = await this.runtime.callFunction("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return raw.parsed(false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
class BamlStreamClient {
    runtime;
    ctxManager;
    bamlOptions;
    constructor(runtime, ctxManager, bamlOptions) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
        this.bamlOptions = bamlOptions || {};
    }
    ExtractResume(resume, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.streamFunction("ExtractResume", {
                "resume": resume
            }, undefined, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return new BamlStream(raw, (a) => a, (a) => a, this.ctxManager.cloneContext());
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.streamFunction("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, undefined, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return new BamlStream(raw, (a) => a, (a) => a, this.ctxManager.cloneContext());
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateSixPlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.streamFunction("GenerateSixPlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, undefined, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return new BamlStream(raw, (a) => a, (a) => a, this.ctxManager.cloneContext());
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            const options = { ...this.bamlOptions, ...(__baml_options__ || {}) };
            const collector = options.collector ? (Array.isArray(options.collector) ? options.collector : [options.collector]) : [];
            const raw = this.runtime.streamFunction("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, undefined, this.ctxManager.cloneContext(), options.tb?.__tb(), options.clientRegistry, collector);
            return new BamlStream(raw, (a) => a, (a) => a, this.ctxManager.cloneContext());
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
export const b = new BamlAsyncClient(DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX);
