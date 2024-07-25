/* union */
import { HeaderUnion } from '../Component/union/headerUnion';
import { BigTitle } from '../Component/parts/bigSection';
import { GuildCardContainer, TagListSection } from '../Component/union/SectionUnion';
/* faker-js */
import { fakerJA as faker } from '@faker-js/faker';
/* react-bootstrap */
import Container from 'react-bootstrap/Container';
import { GuildCard } from '../Component/parts/conversion';
import { timeDiff } from '../Function/DateCalc';
import { isLocal } from '../Function/LocalRemoteSwitcher';
import { useEffect } from 'react';


export function Home(props) {
    useEffect(() => {
        isLocal();
    }, []);
    return (
        <Container>
            <HeaderUnion />
            <BigTitle />
            <TagListSection />
            <GuildCardContainer>
                {[...Array(10)].map((v, index) => v =
                    <GuildCard key={index}
                        guildIcon={faker.image.url()}
                        guildTags={faker.word.words(5).split(' ')}
                        guildName={faker.word.words({ min: 1, max: 2 })}
                        guildDescription={faker.lorem.sentences({ min: 1, max: 20 })}
                        guildLastUpdated={`${timeDiff(faker.date.past())}`}

                        guildDailyActiveRank={faker.number.int({ max: 10000 })}
                        guildDailyActiveRatio={faker.number.int({ max: 10000 })}

                        guildMonthlyActiveRank={faker.number.int({ max: 10000 })}
                        guildMonthlyActiveRatio={faker.number.int({ max: 10000 })}

                        guildYearlyActiveRank={faker.number.int({ max: 10000 })}
                        guildYearlyActiveRatio={faker.number.int({ max: 10000 })}
                    />
                )}
            </GuildCardContainer>
        </Container>
    );
}

// meta 情報 section
// サーバーパネルズ section