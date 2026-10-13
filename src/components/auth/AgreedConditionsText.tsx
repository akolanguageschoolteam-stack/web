import { Typography } from '../storyBook/atoms/Typography'
import { useTranslation } from '@/hooks/useTranslation'
import Divider from '../storyBook/atoms/Divider';
import LocalizeLink from '../commonComponents/LocalizeLink';

interface AgreedConditionsTextProps {
    listPropPage?: boolean
}

const AgreedConditionsText = ({ listPropPage }: AgreedConditionsTextProps) => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-col justify-end '>
            <Divider width="bleed" className="" />
            <div className="flex flex-col items-center gap-1 mt-4">
                <Typography variant="caption" className="textPrimaryColor!">
                    {t('byClickingContinue')}

                    {
                        listPropPage &&
                        <LocalizeLink href={`/partner-policy`} target='_blank' className="primaryColor! font-medium cursor-pointer pl-1">
                            {t('partnerPolicy')}
                        </LocalizeLink>
                    }
                </Typography>
                {
                    !listPropPage &&
                    <div className="flex items-center gap-1">
                        <LocalizeLink href={`/terms-conditions`} className="primaryColor! font-medium cursor-pointer">
                            {t('termsAndConditions')}
                        </LocalizeLink>
                        <Typography variant="caption" className="textPrimaryColor!">
                            {t('and')}
                        </Typography>
                        <LocalizeLink href={`/privacy-policy`} className="primaryColor! font-medium cursor-pointer">
                            {t('privacyPolicy')}
                        </LocalizeLink>
                    </div>
                }

            </div>
        </div >
    )
}

export default AgreedConditionsText
