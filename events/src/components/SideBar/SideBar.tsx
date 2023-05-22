import {
  Badge,
  IconButton,
  IconButtonProps,
  Tooltip,
  useTheme,
  Modal,
  Text,
  Button,
  Space,
} from '@dolbyio/comms-uikit-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import styles from './SideBar.module.scss';

type SideBarButtonsProps = {
  backgroundColor?: string;
  badge?: number;
  icon: IconButtonProps['icon'];
  tooltipText: string;
  id?: string;
  testID?: string;
  onClick: () => void;
};

const SideBarButton = ({ backgroundColor, badge, icon, tooltipText, id, testID, onClick }: SideBarButtonsProps) => {
  return (
    <Tooltip text={tooltipText}>
      <div className={styles.buttonContainer}>
        <IconButton
          id={id}
          testID={testID}
          backgroundColor={backgroundColor}
          variant="circle"
          size="s"
          iconSize="m"
          icon={icon}
          onClick={onClick}
        >
          {!!badge && badge > 0 && (
            <div className={styles.badgeContainer}>
              <Badge backgroundColor="primary.300" content={badge} />
            </div>
          )}
        </IconButton>
      </div>
    </Tooltip>
  );
};

const SideBar = ({
  numParticipants = 0,
  numUnreadMessages = 0,
  onParticipantsClick,
  onChatClick,
  onInviteClick,
  onSettingsClick,
  onExitConfirm,
}: {
  numParticipants?: number;
  numUnreadMessages?: number;
  onParticipantsClick?: () => void;
  onChatClick?: () => void;
  onInviteClick?: () => void;
  onSettingsClick?: () => void;
  onExitConfirm?: () => void;
}) => {
  const [showLeaveCheckModal, setShowLeaveCheckModal] = useState(false);
  const { getColor } = useTheme();
  const intl = useIntl();

  return (
    <div className={styles.sideBar}>
      {onParticipantsClick && (
        <SideBarButton
          id="participantsButton"
          testID="ParticipantsButton"
          badge={numParticipants}
          tooltipText={intl.formatMessage({ id: 'participantsLabel' })}
          icon="participants"
          onClick={onParticipantsClick}
        />
      )}
      {onChatClick && (
        <SideBarButton
          id="chatButton"
          testID="ChatButton"
          badge={numUnreadMessages}
          tooltipText="Chat"
          icon="chat"
          onClick={onChatClick}
        />
      )}
      <div className={styles.lowerSectionStart} />
      {onInviteClick && (
        <div>
          <SideBarButton
            id="inviteButton"
            testID="InviteButton"
            tooltipText={intl.formatMessage({ id: 'inviteLabel' })}
            icon="invite"
            onClick={onInviteClick}
          />
        </div>
      )}
      {onSettingsClick && (
        <div className={styles.aboveDivider}>
          <SideBarButton
            id="settingsButton"
            testID="SettingsButton"
            tooltipText={intl.formatMessage({ id: 'settings' })}
            icon="settings"
            onClick={onSettingsClick}
          />
        </div>
      )}
      {onExitConfirm && (
        <div className={styles.exit}>
          <SideBarButton
            id="leaveEventButton"
            testID="LeaveEventButton"
            tooltipText={intl.formatMessage({ id: 'exit' })}
            icon="exit"
            backgroundColor={getColor('infoError')}
            onClick={() => setShowLeaveCheckModal(true)}
          />
        </div>
      )}
      <Modal
        testID="LeaveEventModel"
        isVisible={showLeaveCheckModal}
        close={() => setShowLeaveCheckModal(false)}
        closeButton
        overlayClickClose
      >
        <Space m="l" className={styles.modal}>
          <Text testID="LeaveEventModelDescription" type="h6" align="center">
            Are you sure you want to leave the event?
          </Text>
          <Button testID="LeaveButton" size="s" fw onClick={onExitConfirm}>
            leave event
          </Button>
          <Button testID="CancelButton" variant="secondary" size="s" fw onClick={() => setShowLeaveCheckModal(false)}>
            cancel
          </Button>
        </Space>
      </Modal>
    </div>
  );
};

export default SideBar;
