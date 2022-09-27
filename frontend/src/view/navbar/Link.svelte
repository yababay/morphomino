<script lang="ts">
    export let label: string, href: string

    $: active = href === window.location.hash

    function toggleActive(e){
      const {target} = e
      const ul = target.closest('.right-items-holder')
      const links = Array.from(ul.querySelectorAll('a'))
      for(const link of links){
        link.classList.remove('active')
      }
      target.classList.add('active')
    }
</script>

<ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" class:active {href} on:click={toggleActive}>{label}</a>
    </li>
</ul>
