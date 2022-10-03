<script lang="ts">
    export let label: string, href: string

    function toggleActive(e){
      const {target} = e
      if(!(target instanceof HTMLElement)) return
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
      <a class="nav-link" on:click={toggleActive} {href}>{label}</a>
    </li>
</ul>
