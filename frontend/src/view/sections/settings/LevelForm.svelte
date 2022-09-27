<!-- script lang="ts">

</script>

<form bind:this={levelsForm}>
    {#each Level.getKeysWithLabels() as item}
      <div class="form-check">
        <input class="form-check-input" type="radio" name="level" value={item.key} id={`level-${item.key}`} checked={isCurrent(item.key)}>
        <label class="form-check-label" for={`level-${item.key}`}>
          {item.label}
        </label>
      </div>
    {/each}
</form -->