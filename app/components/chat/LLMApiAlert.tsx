import { AnimatePresence, motion } from 'framer-motion';
import type { LlmErrorAlertType } from '~/types/actions';
import { classNames } from '~/utils/classNames';

interface Props {
  alert: LlmErrorAlertType;
  clearAlert: () => void;
}

export default function LlmErrorAlert({ alert, clearAlert }: Props) {
  const { title, description, provider, errorType } = alert;

  const getErrorIcon = () => {
    switch (errorType) {
      case 'authentication':
        return 'i-ph:key-duotone';
      case 'rate_limit':
        return 'i-ph:clock-duotone';
      case 'quota':
        return 'i-ph:warning-circle-duotone';
      default:
        return 'i-ph:warning-duotone';
    }
  };

  const getErrorMessage = () => {
    switch (errorType) {
      case 'authentication':
        return `Échec de l'authentification avec ${provider}. Veuillez vérifier votre clé API.`;
      case 'rate_limit':
        return `Limite de débit dépassée pour ${provider}. Veuillez patienter avant de réessayer.`;
      case 'quota':
        return `Quota dépassé pour ${provider}. Veuillez vérifier les limites de votre compte.`;
      default:
        return "Une erreur s'est produite lors du traitement de votre demande.";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-fmc-elements-borderColor bg-fmc-elements-background-depth-2 p-4 mb-2"
      >
        <div className="flex items-start">
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`${getErrorIcon()} text-xl text-fmc-elements-button-danger-text`}></div>
          </motion.div>

          <div className="ml-3 flex-1">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium text-fmc-elements-textPrimary"
            >
              {title}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-sm text-fmc-elements-textSecondary"
            >
              <p>{getErrorMessage()}</p>

              {description && (
                <div className="text-xs text-fmc-elements-textSecondary p-2 bg-fmc-elements-background-depth-3 rounded mt-4 mb-4">
                  Détails de l'erreur : {description}
                </div>
              )}
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex gap-2">
                <button
                  onClick={clearAlert}
                  className={classNames(
                    'px-2 py-1.5 rounded-md text-sm font-medium',
                    'bg-fmc-elements-button-secondary-background',
                    'hover:bg-fmc-elements-button-secondary-backgroundHover',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fmc-elements-button-secondary-background',
                    'text-fmc-elements-button-secondary-text',
                  )}
                >
                  Ignorer
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
