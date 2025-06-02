/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/
import { toBamlError, HTTPRequest } from "@boundaryml/baml";
export class AsyncHttpRequest {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    async ExtractResume(resume, __baml_options__) {
        try {
            return await this.runtime.buildRequest("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateSixPlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GenerateSixPlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, false);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
export class AsyncHttpStreamRequest {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    async ExtractResume(resume, __baml_options__) {
        try {
            return await this.runtime.buildRequest("ExtractResume", {
                "resume": resume
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GeneratePlaygroundDiagramMock(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GeneratePlaygroundDiagramMock", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateSixPlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GenerateSixPlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    async GenerateThreePlaygroundDiagramMocks(rawToolsInput, __baml_options__) {
        try {
            return await this.runtime.buildRequest("GenerateThreePlaygroundDiagramMocks", {
                "rawToolsInput": rawToolsInput
            }, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry, true);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
