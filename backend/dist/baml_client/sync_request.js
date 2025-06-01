/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/
import { toBamlError, HTTPRequest } from "@boundaryml/baml";
export class HttpRequest {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    ExtractResume(resume, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
export class HttpStreamRequest {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    ExtractResume(resume, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return this.runtime.buildRequestSync("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
