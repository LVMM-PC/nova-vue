<template>
  <div>
    <div class="box">
      <Matrix></Matrix>

      <Matrix type="success"></Matrix>

      <Matrix type="info"></Matrix>

      <Matrix type="warning"></Matrix>

      <Matrix type="error"></Matrix>
    </div>
    <div class="box">
      <NovaAlert
        block
        border
        type="success"
        :data-id="dataId"
        @click="handleClick"
        @mouseenter="handleMouseenter"
        @mouseleave="handleMouseleave"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert block border type="info"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert block border type="warning"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert block border type="error"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert block border type="success" @click="handleClick"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eos
        itaque iure minima minus, molestias quas qui quis tempore velit?
        Aspernatur dolore dolorem facilis, maxime odio porro similique tempora
        totam!
      </NovaAlert>
      <NovaAlert block border type="info"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto
        dolore eos illo itaque, molestiae, natus nulla quia sunt suscipit
        veritatis voluptatum? Laboriosam minus, quibusdam quod recusandae
        suscipit vel voluptatem!
      </NovaAlert>
      <NovaAlert block border type="warning"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dolore
        itaque iusto mollitia, natus quibusdam quidem quos vitae? Ad dolore eius
        laudantium maiores nostrum placeat tenetur! Aut modi qui quod!
      </NovaAlert>
      <NovaAlert block border type="error"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
        cupiditate iste numquam officia quo quod repudiandae sapiente. Ab
        aperiam, eligendi error fugit in iure laborum perspiciatis quia sed unde
        velit?
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert
        block
        border
        closable
        type="success"
        @afterClose="handleAfterClose"
        @close="handleClose"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aut
        commodi doloribus quia quisquam sed veniam! Culpa dignissimos eum facere
        illum, mollitia nemo nesciunt quos similique tempore velit vero
        voluptatibus.
      </NovaAlert>
      <NovaAlert block border closable type="info"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
        enim, et itaque nesciunt sapiente sequi voluptatem? Aut commodi deleniti
        minima natus nihil veniam. Dolore ducimus harum officia praesentium quo,
        voluptas?
      </NovaAlert>
      <NovaAlert block border closable type="warning"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ea
        laboriosam magnam nostrum perspiciatis quia quos recusandae sapiente.
        Consectetur facilis optio quidem quod soluta tempora temporibus!
        Doloremque facilis minima perspiciatis!
      </NovaAlert>
      <NovaAlert block border closable type="error"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        atque autem cum debitis incidunt magni? Accusantium ad aspernatur
        assumenda, aut beatae error eveniet illum nostrum obcaecati quas qui ut,
        vitae.
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert block type="success"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
        voluptatum!
      </NovaAlert>
      <NovaAlert block type="info"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate,
        eaque.
      </NovaAlert>
      <NovaAlert block type="help"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur,
        error.
      </NovaAlert>
      <NovaAlert block type="warning"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum,
        repellendus.
      </NovaAlert>
      <NovaAlert block type="error"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos,
        saepe.
      </NovaAlert>
      <NovaAlert block
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
        possimus.
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border type="success">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert border type="info">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert border type="warning">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert border type="error">Lorem ipsum dolor sit amet.</NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border type="success">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert border type="info"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
        architecto dolor illo nam, obcaecati officiis quasi qui, quia quos rem
        reprehenderit ullam veniam, voluptate! Libero natus nesciunt quis rem
        voluptate.
      </NovaAlert>
      <NovaAlert border type="warning">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert border type="error"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut,
        eveniet fugit inventore ipsam laudantium, natus nesciunt obcaecati
        perferendis, soluta veniam? Alias consectetur cumque doloremque ea nemo
        sequi sint.
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert border closable type="success"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert border closable type="info"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert border closable type="warning"
        >Lorem ipsum dolor sit amet.
      </NovaAlert>
      <NovaAlert border closable type="error"
        >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        animi atque blanditiis consequuntur culpa deserunt dignissimos dolor
        fuga incidunt inventore ipsa maxime nam pariatur repellendus similique,
        tenetur ullam, veritatis vitae!
      </NovaAlert>
    </div>
    <div class="box">
      <NovaAlert type="success">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert type="info">Lorem ipsum dolor sit amet. </NovaAlert>
      <NovaAlert type="help">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert type="warning">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert type="error">Lorem ipsum dolor sit amet.</NovaAlert>
      <NovaAlert>Lorem ipsum dolor sit amet.</NovaAlert>
    </div>
  </div>
</template>

<script>
import NovaAlert from '@/components/alert/NovaAlert';
import Matrix from '@/views/demos/alert/Matrix';
import Utils from '@/utils/utils';

export default {
  name: 'AlertDemo',
  components: { Matrix, NovaAlert },
  data() {
    return {
      dataId: 42
    };
  },
  methods: {
    handleClick(e) {
      console.log(e);
      this.dataId = Utils.getRandomInt(0, 42);
    },
    handleMouseenter(e) {
      console.log(e);
    },
    handleMouseleave(e) {
      console.log(e);
    },
    handleClose() {
      console.log('close');
    },
    handleAfterClose() {
      console.log('after close');
    }
  }
};
</script>

<style lang="less" scoped>
.nova-alert {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>
