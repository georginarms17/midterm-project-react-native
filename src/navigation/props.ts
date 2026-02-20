//import { NavigationProp } from '@react-navigation/native';

//export interface Props {
//    navigation: NavigationProp<any>;
//}

import { Job } from "../models/Job";
import { ROUTES } from "../constants/routes";

export type RootStackParamList = {
  [ROUTES.JOB_FINDER]: undefined;
  [ROUTES.SAVED_JOBS]: undefined;
  [ROUTES.APPLICATION_FORM]: { job: Job; fromSaved?: boolean };
};
