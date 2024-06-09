<script>
  import { Alert } from "flowbite-svelte";
  import { APP_STATUS, appStatus} from '../store.ts';
  import StepUpload from './StepUpload.svelte';
  import StepLoading from './StepLoading.svelte';
  import StepChat from './StepChat.svelte';

</script>

{#if $appStatus === APP_STATUS.INIT}
<StepUpload />
{:else if $appStatus === APP_STATUS.LOADING}
<StepLoading />
{:else if $appStatus === APP_STATUS.ERROR}
<Alert>
    <span class="font-medium">Something's wrong</span>
    There are an exception in app
  </Alert>
{:else if $appStatus === APP_STATUS.CHAT_MODE}
<StepChat />
{:else}
<Alert>
    <span class="font-medium">Action is not recognized</span>
    unknown action
  </Alert>
{/if}



