<script lang="ts">
    export let label: string, href: string

    function toggleActive(e: Event){
      const {target} = e
      if(!(target instanceof HTMLElement)) return
      const ul = target.closest('#navbar-links')
      const links = Array.from(ul.querySelectorAll('a'))
      for(const link of links){
        link.classList.remove('active')
      }
      target.classList.add('active')
    }
</script>

<ul class="navbar-nav navbar-ul-fixed-width">
    <li class="nav-item">
      <a class="nav-link" on:click={toggleActive} {href}>{label}</a>
    </li>
</ul>
