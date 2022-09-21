<script>
    import { stage } from '../../../controller/game';
    import { GameStages } from '../../../model'
    import Instruction from './Instruction.svelte';
    import Finish from './Finish.svelte';
    import Flow from './Flow.svelte';
    import Deal from './Deal.svelte';

    export let id

</script>

{#if $stage === GameStages.INSTRUCTION }
    <Instruction {id} />
{:else if $stage === GameStages.SETUP }
    <Deal />
{:else if $stage === GameStages.FLOW }
    <Deal />
    <Flow />
{:else if $stage === GameStages.BREAK }
    <Finish mode={GameStages.BREAK} />
{:else if $stage === GameStages.HOST_IS_WON }
    <Finish mode={GameStages.HOST_IS_WON}/>
{:else if $stage === GameStages.GUEST_IS_WON }
    <Finish mode={GameStages.GUEST_IS_WON}/>
{:else if $stage === GameStages.DEAD_HEAT }
    <Finish mode={GameStages.DEAD_HEAT}/>
{:else if $stage === GameStages.TIMEOUT }
    <Finish mode={GameStages.TIMEOUT}/>
{:else if $stage === GameStages.END }
    <Finish mode={GameStages.END}/>
{/if}
