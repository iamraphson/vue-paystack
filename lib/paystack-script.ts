import { ref, onUnmounted, reactive, onBeforeMount } from "vue";

const cachedScripts: string[] = [];
interface IScriptResult {
  scriptLoaded: boolean;
  scriptError: boolean;
}

export default function usePaystackScript(): IScriptResult {
  const src = "https://js.paystack.co/v1/inline.js";

  const scriptState = reactive<IScriptResult>({
    scriptLoaded: false,
    scriptError: false,
  });

  const script = ref<HTMLScriptElement>();

  const onScriptLoad = (): void => {
    scriptState.scriptLoaded = true;
  };

  const onScriptError = (): void => {
    const index = cachedScripts.indexOf(src);
    if (index >= 0) cachedScripts.splice(index, 1);
    script.value && script.value.remove();

    scriptState.scriptError = true;
  };

  const handleLoadScript = () => {
    if (cachedScripts.includes(src)) {
      scriptState.scriptLoaded = true;
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

  onBeforeMount(() => {
    handleLoadScript();
  });

  onUnmounted(() => {
    if (script.value) {
      script.value.removeEventListener("load", onScriptLoad);
      script.value.removeEventListener("error", onScriptError);
    }
  });

  return scriptState;
}
