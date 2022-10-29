import { createPinia } from "pinia";
const pinia = createPinia();
import {usePersist} from "pinia-use-persist";
pinia.use(usePersist)
export default pinia;

