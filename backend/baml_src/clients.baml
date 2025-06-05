// Learn more about clients at https://docs.boundaryml.com/docs/snippets/clients/overview

client<llm> CustomGPT4o {
  provider openai
  options {
    model "gpt-4o"
    api_key env.OPENAI_API_KEY
  }
}

client<llm> CustomGPT4oMini {
  provider openai
  retry_policy Exponential
  options {
    model "gpt-4o-mini"
    api_key env.OPENAI_API_KEY
  }
}

client<llm> CustomGPTo1 {
  provider openai
  retry_policy Exponential
  options {
    model "o1-2024-12-17"
    api_key env.OPENAI_API_KEY
  }
}

client<llm> CustomGPT41Mini {
  provider openai
  retry_policy Exponential
  options {
    model "gpt-4.1-mini"
    api_key env.OPENAI_API_KEY
  }
}
client<llm> CustomGPT41 {
  provider openai
  retry_policy Exponential
  options {
    model "gpt-4.1"
    api_key env.OPENAI_API_KEY
  }
}
client<llm> CustomGPT41mini {
  provider openai
  retry_policy Exponential
  options {
    model "gpt-4.1-mini-2025-04-14"
    api_key env.OPENAI_API_KEY
  }
}
client<llm> CustomGPTo1mini {
  provider openai
  retry_policy Exponential
  options {
    model "o1-mini"
    api_key env.OPENAI_API_KEY
  }
}
client<llm> CustomGPTo4mini {
  provider openai
  retry_policy Exponential
  options {
    model "o4-mini-2025-04-16"
    api_key env.OPENAI_API_KEY
  }
}

client<llm> CustomSonnet {
  provider anthropic
  options {
    model "claude-3-5-sonnet-20241022"
    api_key env.ANTHROPIC_API_KEY
  }
}


client<llm> CustomHaiku {
  provider anthropic
  retry_policy Constant
  options {
    model "claude-3-haiku-20240307"
    api_key env.ANTHROPIC_API_KEY
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/round-robin
client<llm> CustomFast {
  provider round-robin
  options {
    // This will alternate between the two clients
    strategy [CustomGPT4oMini, CustomHaiku]
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/fallback
client<llm> OpenaiFallback {
  provider fallback
  options {
    // This will try the clients in order until one succeeds
    strategy [CustomGPT4oMini, CustomGPT4oMini]
  }
}

// https://docs.boundaryml.com/docs/snippets/clients/retry
retry_policy Constant {
  max_retries 3
  // Strategy is optional
  strategy {
    type constant_delay
    delay_ms 200
  }
}

retry_policy Exponential {
  max_retries 2
  // Strategy is optional
  strategy {
    type exponential_backoff
    delay_ms 300
    multiplier 1.5
    max_delay_ms 10000
  }
}