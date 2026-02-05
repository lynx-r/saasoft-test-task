<script setup lang="ts">
import { ACCOUNT_OPTIONS } from "@/constants/account";
import useAccountsStore from "@/stores/accounts";
import { AccountSchema, type Account, type AccountType } from "@/types/account";
import { Form, FormField, type FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { IftaLabel, InputText, Password, Select, Toast } from "primevue";
import { useToast } from "primevue/usetoast";
import { computed, ref, shallowRef, useTemplateRef } from "vue";

const toast = useToast();

const { account } = defineProps<{ account: Account }>();

const initialAccount = shallowRef(account);
const accountType = ref(account.type);

const { updateAccount } = useAccountsStore();

const gridClasses = computed(() =>
  accountType.value === "local" ? "grid-cols-[25%_25%_1fr_1fr]" : "grid-cols-[25%_25%_2fr]",
);

const formRef = useTemplateRef("formRef");

const resolver = zodResolver(AccountSchema);

const onFormSubmit = (e: FormSubmitEvent) => {
  if (e.valid) {
    if (e.values?.id) {
      updateAccount(e.values.id, e.values as Account);
      toast.add({ severity: "success", summary: "Аккаунт сохранён.", life: 3000 });
    }
  } else {
    const fieldErrors = Object.values(e.errors);
    for (let errors of fieldErrors) {
      // @ts-ignore
      const summary = errors.map(({ message }) => message).join("\n");
      toast.add({ severity: "error", summary, life: 3000 });
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
const onAccountTypeChanged = (type: AccountType) => {
  accountType.value = type;
  if (type === "ldap") {
    initialAccount.value.password = undefined;
    // @ts-ignore
    formRef.value?.setFieldValue("password", undefined);
  } else {
    initialAccount.value.password = "";
    // @ts-ignore
    formRef.value?.setFieldValue("password", "");
  }
};
</script>

<template>
  <div>???</div>
  <Form
    ref="formRef"
    :resolver
    :initial-values="initialAccount"
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
        @value-change="onAccountTypeChanged"
      />
      <label for="type">Тип записи</label>
    </IftaLabel>
    <IftaLabel>
      <InputText id="login" name="login" fluid @blur="submitFormProgrammatically" />
      <label for="login">Логин</label>
    </IftaLabel>
    <IftaLabel v-if="accountType === 'local'">
      <Password
        id="password"
        name="password"
        toggle-mask
        fluid
        @blur="submitFormProgrammatically"
      />
      <label for="password">Пароль</label>
    </IftaLabel>
  </Form>
</template>
