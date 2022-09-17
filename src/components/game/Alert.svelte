<script>
    import { alertMessage } from '../../lib/store'
</script>

<div style:display={$alertMessage ? 'block' : 'none'} class="alert-holder">
    <div class="d-flex">
      <div class="toast-body">
        <div class="alert alert-danger text-center" role="alert">
            {$alertMessage}
        </div>
      </div>
    </div>
</div>

<style>
    .alert-holder {
        position: absolute;
        bottom: 1rem;
        right: 2rem;
    }
</style>