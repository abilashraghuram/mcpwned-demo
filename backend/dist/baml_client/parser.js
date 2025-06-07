/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/
import { toBamlError } from "@boundaryml/baml";
export class LlmResponseParser {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    ExtractResume(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("ExtractResume", llmResponse, false, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GeneratePlaygroundDiagramMock", llmResponse, false, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateSingleRule(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateSingleRule", llmResponse, false, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateSixPlaygroundDiagramMocks(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateSixPlaygroundDiagramMocks", llmResponse, false, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateThreePlaygroundDiagramMocks", llmResponse, false, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
export class LlmStreamParser {
    runtime;
    ctxManager;
    constructor(runtime, ctxManager) {
        this.runtime = runtime;
        this.ctxManager = ctxManager;
    }
    ExtractResume(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("ExtractResume", llmResponse, true, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GeneratePlaygroundDiagramMock(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GeneratePlaygroundDiagramMock", llmResponse, true, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateSingleRule(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateSingleRule", llmResponse, true, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateSixPlaygroundDiagramMocks(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateSixPlaygroundDiagramMocks", llmResponse, true, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
    GenerateThreePlaygroundDiagramMocks(llmResponse, __baml_options__) {
        try {
            return this.runtime.parseLlmResponse("GenerateThreePlaygroundDiagramMocks", llmResponse, true, this.ctxManager.cloneContext(), __baml_options__?.tb?.__tb(), __baml_options__?.clientRegistry);
        }
        catch (error) {
            throw toBamlError(error);
        }
    }
}
