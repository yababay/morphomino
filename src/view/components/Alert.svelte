<script>
    import { alert } from '../../controller/flow'
</script>

<div style:display={$alert ? 'block' : 'none'} class="alert-holder">
    <div class="d-flex">
      <div class="toast-body">
        <div class="alert alert-danger text-center" role="alert">
            {$alert}
        </div>
      </div>
    </div>
</div>
