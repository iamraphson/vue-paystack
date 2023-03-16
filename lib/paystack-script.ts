import { ref, onMounted, onUnmounted } from "vue";

const cachedScripts: string[] = [];
interface IScriptResult {
  loaded: boolean;
  error: boolean;
}

export default function usePaystackScript(): boolean[] {
  const src = "https://js.paystack.co/v1/inline.js";

  const scriptState = ref<IScriptResult>({
    loaded: false,
    error: false,
  });

  const script = ref<HTMLScriptElement>();

  const onScriptLoad = (): void => {
    scriptState.value = {
      loaded: true,
      error: false,
    };
  };

  const onScriptError = (): void => {
    const index = cachedScripts.indexOf(src);
    if (index >= 0) cachedScripts.splice(index, 1);
    script.value && script.value.remove();

    scriptState.value = {
      loaded: true,
      error: false,
    };
  };

  const handleLoadScript = () => {
    if (cachedScripts.includes(src)) {
      scriptState.value = {
        loaded: true,
        error: false,
      };
    } else {
      cachedScripts.push(src);

      const scriptElement = document.createElement("script");
      script.value = scriptElement;

      script.value.src = src;
      script.value.async = true;

      script.value.addEventListener("load", onScriptLoad);
      script.value.addEventListener("complete", onScriptLoad);
      script.value.addEventListener("error", onScriptError);

      document.body.appendChild(script.value);
    }
  };

  onMounted(() => {
    handleLoadScript();
  });

  onUnmounted(() => {
    if (script.value) {
      script.value.removeEventListener("load", onScriptLoad);
      script.value.removeEventListener("error", onScriptError);
    }
  });

  return [scriptState.value.loaded, scriptState.value.error];
}
