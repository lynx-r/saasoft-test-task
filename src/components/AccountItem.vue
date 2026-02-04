<script setup lang="ts">
import { ACCOUNT_OPTIONS } from "@/constants/Account";
import useAccountsStore from "@/stores/accounts";
import { AccountSchema, type Account } from "@/types";
import { Form, FormField, type FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { IftaLabel, InputText, Password, Select, Toast } from "primevue";
import { useToast } from "primevue/usetoast";
import { computed, useTemplateRef } from "vue";

const toast = useToast();

const { account } = defineProps<{ account: Account }>();
const { updateAccount } = useAccountsStore();

const gridClasses = computed(() =>
  account.type === "local" ? "grid-cols-[25%_25%_1fr_1fr]" : "grid-cols-[25%_25%_2fr]",
);

const formRef = useTemplateRef("formRef");

const resolver = zodResolver(AccountSchema);

const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    if (e.values.id) {
      updateAccount(e.values.id, e.values as Account);
      toast.add({ severity: "success", summary: "Аккаунт сохранён.", life: 3000 });
    }
  }
};
const submitFormProgrammatically = (): void => {
  if (formRef.value) {
    // Access the native HTML form element via $el and dispatch the submit event
    // @ts-expect-error - PrimeVue Form component doesn't expose $el in types but renders as native form
    const formEl = formRef.value.$el as HTMLFormElement;

    // Using requestSubmit() is preferred as it acts as if a submit button was clicked,
    // including triggering validation (if the browser supports it, which most modern ones do).
    // If you need maximum compatibility, you can use the manual Event dispatch method as well.
    if (typeof formEl?.requestSubmit === "function") {
      formEl.requestSubmit();
    } else {
      // Fallback for older browsers
      const event = new Event("submit", { bubbles: true, cancelable: true });
      formEl.dispatchEvent(event);
    }
  }
};
</script>

<template>
  <div tabindex="-1"></div>
  <Form
    ref="formRef"
    :resolver
    :initial-values="account"
    :validate-on-value-update="false"
    validate-on-blur
    class="grid gap-2 w-full"
    :class="gridClasses"
    @submit="onFormSubmit"
  >
    <Toast />
    <FormField v-slot="$field" name="id" v-show="false">
      <input type="hidden" v-bind="$field.props" />
    </FormField>
    <IftaLabel>
      <InputText id="tag" name="tag" fluid @blur="submitFormProgrammatically" />
      <label for="tag">Метка</label>
    </IftaLabel>
    <IftaLabel>
      <Select
        id="type"
        :options="ACCOUNT_OPTIONS"
        option-label="optionLabel"
        option-value="optionValue"
        name="type"
        fluid
        @value-change="submitFormProgrammatically"
      />
      <label for="type">Тип записи</label>
    </IftaLabel>
    <IftaLabel>
      <InputText id="login" name="login" fluid @blur="submitFormProgrammatically" />
      <label for="login">Логин</label>
    </IftaLabel>
    <IftaLabel v-if="account?.type === 'local'">
      <Password
        id="password"
        name="password"
        toggle-mask
        fluid
        @blur="submitFormProgrammatically"
      />
      <label for="tag">Пароль</label>
    </IftaLabel>
  </Form>
</template>
