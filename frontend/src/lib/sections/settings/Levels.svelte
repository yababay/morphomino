<script lang="ts">
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { level } from "./settings";
  import { Level } from "../../types";

  let levelsForm: HTMLFormElement;
  const items = Level.getKeysWithLabels().map(({key, label})=> ({key: key.replace('CLASS_', ''), label}))

  function saveLevel() {
    const { value } = levelsForm.level;
    level.set(value);
  }

  function isCurrent(l: string){
    return l === $level
  }
</script>

<form bind:this={levelsForm}>
  <div class="all-levels">
    <div class="single-level">
      {#each items.filter( ({key}) => key.startsWith("5_") ) as item}
        <div class="form-check">
          <input
            on:change={saveLevel}
            class="form-check-input"
            type="radio"
            name="level"
            value={item.key}
            id={`level-${item.key}`}
            checked={isCurrent(item.key)}
          />
          <label class="form-check-label" for={`level-${item.key}`}>
            {item.label}
          </label>
        </div>
      {/each}
    </div>
    <div class="single-level">
      {#each items.filter( ({key}) => key.startsWith("6_") ) as item}
        <div class="form-check">
          <input
            on:change={saveLevel}
            class="form-check-input"
            type="radio"
            name="level"
            value={item.key}
            id={`level-${item.key}`}
            checked={isCurrent(item.key)}
          />
          <label class="form-check-label" for={`level-${item.key}`}>
            {item.label}
          </label>
        </div>
      {/each}
    </div>
    <div class="single-level">
      {#each items.filter( ({key}) => key.startsWith("6_") ) as item}
        <div class="form-check">
          <input
            on:change={saveLevel}
            class="form-check-input"
            type="radio"
            name="level"
            value={item.key}
            id={`level-${item.key}`}
            checked={isCurrent(item.key)}
          />
          <label class="form-check-label" for={`level-${item.key}`}>
            {item.label}
          </label>
        </div>
      {/each}
    </div>
  </div>
</form>

<style>
  .all-levels {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
