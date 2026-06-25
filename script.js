document.addEventListener('DOMContentLoaded', () => {
    const EXERCISE_IMAGE_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';
    const STORAGE_KEY = 'projeto-evolucao-substitutions-v2';

    const frameSet = (id) => [
        `${EXERCISE_IMAGE_BASE}/${id}/0.jpg`,
        `${EXERCISE_IMAGE_BASE}/${id}/1.jpg`
    ];

    const muscle = (slug, role = 'primary') => ({ slug, role });

    const MUSCLE_LABELS = {
        chest: 'Peitoral',
        upperChest: 'Peito superior',
        frontShoulder: 'Ombro frontal',
        sideShoulder: 'Ombro lateral',
        rearShoulder: 'Ombro posterior',
        triceps: 'Tríceps',
        lats: 'Dorsais',
        midBack: 'Meio das costas',
        traps: 'Trapézio',
        biceps: 'Bíceps',
        forearms: 'Antebraços',
        quads: 'Quadríceps',
        glutes: 'Glúteos',
        hamstrings: 'Posteriores',
        calves: 'Panturrilhas',
        core: 'Core'
    };

    const EXERCISE_MUSCLES = {
        'Supino reto máquina ou barra': [muscle('chest'), muscle('frontShoulder', 'secondary'), muscle('triceps', 'secondary')],
        'Supino inclinado halteres': [muscle('upperChest'), muscle('frontShoulder', 'secondary'), muscle('triceps', 'secondary')],
        'Crucifixo máquina': [muscle('chest'), muscle('frontShoulder', 'secondary')],
        'Desenvolvimento máquina': [muscle('frontShoulder'), muscle('sideShoulder'), muscle('triceps', 'secondary')],
        'Elevação lateral': [muscle('sideShoulder')],
        'Tríceps corda': [muscle('triceps')],
        'Puxada frontal': [muscle('lats'), muscle('midBack', 'secondary'), muscle('biceps', 'secondary')],
        'Remada baixa': [muscle('midBack'), muscle('lats', 'secondary'), muscle('biceps', 'secondary')],
        'Remada articulada': [muscle('midBack'), muscle('lats'), muscle('traps', 'secondary')],
        'Pulldown': [muscle('lats'), muscle('triceps', 'secondary')],
        'Rosca direta': [muscle('biceps'), muscle('forearms', 'secondary')],
        'Rosca martelo': [muscle('forearms'), muscle('biceps')],
        'Leg press': [muscle('quads'), muscle('glutes'), muscle('hamstrings', 'secondary'), muscle('calves', 'secondary')],
        'Agachamento guiado': [muscle('quads'), muscle('glutes'), muscle('hamstrings', 'secondary'), muscle('core', 'secondary')],
        'Mesa flexora': [muscle('hamstrings'), muscle('calves', 'secondary')],
        'Stiff com halteres': [muscle('hamstrings'), muscle('glutes'), muscle('core', 'secondary')],
        'Cadeira extensora': [muscle('quads')],
        'Panturrilha sentado': [muscle('calves')],
        'Panturrilha em pé': [muscle('calves')],
        'Prancha': [muscle('core')],
        'Face pull': [muscle('rearShoulder'), muscle('midBack', 'secondary'), muscle('traps', 'secondary')],
        'Posterior de ombro': [muscle('rearShoulder'), muscle('midBack', 'secondary'), muscle('traps', 'secondary')],
        'Encolhimento': [muscle('traps')],
        'Supino inclinado': [muscle('upperChest'), muscle('frontShoulder', 'secondary'), muscle('triceps', 'secondary')],
        'Supino máquina': [muscle('chest'), muscle('frontShoulder', 'secondary'), muscle('triceps', 'secondary')],
        'Crossover no cabo': [muscle('chest'), muscle('frontShoulder', 'secondary')],
        'Tríceps francês': [muscle('triceps')],
        'Crunch no chão': [muscle('core')],
        'Crunch reverso': [muscle('core')],
        'Prancha lateral': [muscle('core'), muscle('glutes', 'secondary')],
        'Mountain climber': [muscle('core'), muscle('quads', 'secondary'), muscle('frontShoulder', 'secondary')],
        'Polichinelo': [muscle('calves'), muscle('quads', 'secondary'), muscle('sideShoulder', 'secondary')],
        'Pular corda': [muscle('calves'), muscle('forearms', 'secondary'), muscle('core', 'secondary')],
        'Agachamento com peso corporal': [muscle('quads'), muscle('glutes'), muscle('core', 'secondary')]
    };

    const alt = (name, target, muscles, imageId) => ({ name, target, muscles, frames: frameSet(imageId) });

    const EXERCISE_ALTERNATIVES = {
        'Supino reto máquina ou barra': [
            alt('Supino reto com halteres', 'Peitoral médio, ombro frontal e tríceps. Sinta o peito estabilizar e empurrar os halteres.', EXERCISE_MUSCLES['Supino reto máquina ou barra'], 'Dumbbell_Bench_Press'),
            alt('Supino máquina', 'Peitoral, tríceps e deltoide frontal. Sinta o peito empurrando com as escápulas firmes no banco.', EXERCISE_MUSCLES['Supino máquina'], 'Machine_Bench_Press'),
            alt('Supino reto no Smith', 'Peitoral médio com trajetória guiada. Sinta o peito trabalhar sem perder o controle dos ombros.', EXERCISE_MUSCLES['Supino reto máquina ou barra'], 'Smith_Machine_Bench_Press')
        ],
        'Supino inclinado halteres': [
            alt('Supino inclinado barra', 'Peitoral superior, ombro frontal e tríceps. Sinta a parte alta do peito conduzir a subida.', EXERCISE_MUSCLES['Supino inclinado halteres'], 'Barbell_Incline_Bench_Press_-_Medium_Grip'),
            alt('Supino inclinado máquina', 'Peito superior com movimento guiado. Sinta o peito alto contrair sem elevar os ombros.', EXERCISE_MUSCLES['Supino inclinado halteres'], 'Hammer_Grip_Incline_DB_Bench_Press'),
            alt('Crossover baixo', 'Peitoral superior em adução. Sinta as fibras altas aproximando os braços na frente do peito.', [muscle('upperChest'), muscle('frontShoulder', 'secondary')], 'Low_Cable_Crossover')
        ],
        'Crucifixo máquina': [
            alt('Crossover no cabo', 'Peitoral com foco em fechamento. Sinta o peito aproximar os braços com cotovelos estáveis.', EXERCISE_MUSCLES['Crucifixo máquina'], 'Cable_Crossover'),
            alt('Crucifixo com halteres', 'Peitoral em alongamento controlado. Sinta o peito abrir e fechar sem transformar em supino.', EXERCISE_MUSCLES['Crucifixo máquina'], 'Dumbbell_Flyes'),
            alt('Crossover unilateral', 'Peitoral com controle lado a lado. Sinta cada lado fechar o movimento sem girar o tronco.', EXERCISE_MUSCLES['Crucifixo máquina'], 'Single-Arm_Cable_Crossover')
        ],
        'Desenvolvimento máquina': [
            alt('Desenvolvimento com halteres', 'Deltoides e tríceps. Sinta os ombros estabilizando e empurrando acima da cabeça.', EXERCISE_MUSCLES['Desenvolvimento máquina'], 'Dumbbell_Shoulder_Press'),
            alt('Desenvolvimento barra', 'Ombros e tríceps com core firme. Sinta a força sair dos ombros, sem arquear a lombar.', EXERCISE_MUSCLES['Desenvolvimento máquina'], 'Barbell_Shoulder_Press'),
            alt('Arnold press', 'Deltoide anterior e lateral. Sinta o ombro trabalhar durante a rotação e a subida.', EXERCISE_MUSCLES['Desenvolvimento máquina'], 'Arnold_Dumbbell_Press')
        ],
        'Elevação lateral': [
            alt('Elevação lateral sentado', 'Deltoide lateral com menos impulso. Sinta a lateral do ombro subir a carga.', EXERCISE_MUSCLES['Elevação lateral'], 'Seated_Side_Lateral_Raise'),
            alt('Elevação lateral no cabo', 'Deltoide lateral com tensão constante. Sinta a lateral do ombro desde o início.', EXERCISE_MUSCLES['Elevação lateral'], 'Cable_Seated_Lateral_Raise'),
            alt('Elevação lateral com elástico', 'Deltoide lateral. Sinta a resistência aumentar sem balançar o tronco.', EXERCISE_MUSCLES['Elevação lateral'], 'Lateral_Raise_-_With_Bands')
        ],
        'Tríceps corda': [
            alt('Tríceps barra V', 'Tríceps com foco em extensão forte. Sinta o braço travar no final sem abrir os cotovelos.', EXERCISE_MUSCLES['Tríceps corda'], 'Triceps_Pushdown'),
            alt('Tríceps acima da cabeça na corda', 'Tríceps, principalmente cabeça longa. Sinta o alongamento atrás do braço.', EXERCISE_MUSCLES['Tríceps francês'], 'Cable_Rope_Overhead_Triceps_Extension'),
            alt('Paralelas para tríceps', 'Tríceps, peito e ombro frontal. Sinta os cotovelos estendendo o corpo com controle.', [muscle('triceps'), muscle('chest', 'secondary'), muscle('frontShoulder', 'secondary')], 'Dips_-_Triceps_Version')
        ],
        'Puxada frontal': [
            alt('Puxada neutra fechada', 'Dorsais e bíceps. Sinta os cotovelos descerem perto do tronco.', EXERCISE_MUSCLES['Puxada frontal'], 'Close-Grip_Front_Lat_Pulldown'),
            alt('Puxada unilateral', 'Dorsais com foco lado a lado. Sinta a escápula descer antes de puxar com o braço.', EXERCISE_MUSCLES['Puxada frontal'], 'One_Arm_Lat_Pulldown'),
            alt('Puxada supinada', 'Dorsais com mais bíceps. Sinta as costas puxando mesmo com a pegada mais fechada.', EXERCISE_MUSCLES['Puxada frontal'], 'Underhand_Cable_Pulldowns')
        ],
        'Remada baixa': [
            alt('Remada curvada no Smith', 'Meio das costas, dorsais e bíceps. Sinta os cotovelos irem para trás com o tronco firme.', EXERCISE_MUSCLES['Remada baixa'], 'Smith_Machine_Bent_Over_Row'),
            alt('Remada inclinada com halteres', 'Costas médias e dorsais. Sinta as escápulas juntando sem encolher o pescoço.', EXERCISE_MUSCLES['Remada baixa'], 'Dumbbell_Incline_Row'),
            alt('Remada cavalinho', 'Dorsais e meio das costas. Sinta o peito aberto e os cotovelos puxando para trás.', EXERCISE_MUSCLES['Remada articulada'], 'T-Bar_Row_with_Handle')
        ],
        'Remada articulada': [
            alt('Remada baixa', 'Meio das costas, dorsais e romboides. Sinta as escápulas juntando antes dos braços dominarem.', EXERCISE_MUSCLES['Remada baixa'], 'Seated_Cable_Rows'),
            alt('Remada cavalinho', 'Dorsais, romboides e trapézio médio. Sinta os cotovelos viajando para trás com peito aberto.', EXERCISE_MUSCLES['Remada articulada'], 'T-Bar_Row_with_Handle'),
            alt('Remada T deitado', 'Costas médias com apoio no tronco. Sinta a remada sem roubar com a lombar.', EXERCISE_MUSCLES['Remada articulada'], 'Lying_T-Bar_Row')
        ],
        'Pulldown': [
            alt('Pulldown com corda', 'Dorsais com cotovelos quase fixos. Sinta as axilas fechando no final.', EXERCISE_MUSCLES['Pulldown'], 'Rope_Straight-Arm_Pulldown'),
            alt('Pullover com halter', 'Dorsais e serrátil com peito estabilizando. Sinta o alongamento sem dobrar demais os braços.', [muscle('lats'), muscle('chest', 'secondary'), muscle('triceps', 'secondary')], 'Straight-Arm_Dumbbell_Pullover'),
            alt('Pullover barra', 'Dorsais e peitoral em amplitude. Sinta as costas trazerem o peso de volta.', [muscle('lats'), muscle('chest', 'secondary')], 'Bent-Arm_Barbell_Pullover')
        ],
        'Rosca direta': [
            alt('Rosca Scott no cabo', 'Bíceps com apoio e tensão constante. Sinta a frente do braço contrair sem balançar.', EXERCISE_MUSCLES['Rosca direta'], 'Cable_Preacher_Curl'),
            alt('Rosca alternada inclinada', 'Bíceps em maior alongamento. Sinta a frente do braço trabalhar sem tirar o ombro do banco.', EXERCISE_MUSCLES['Rosca direta'], 'Alternate_Incline_Dumbbell_Curl'),
            alt('Rosca no cabo', 'Bíceps com tensão contínua. Sinta a contração no topo e controle a descida.', EXERCISE_MUSCLES['Rosca direta'], 'Standing_Biceps_Cable_Curl')
        ],
        'Rosca martelo': [
            alt('Rosca martelo alternada', 'Braquial, braquiorradial e bíceps. Sinta antebraço e lateral do braço trabalharem.', EXERCISE_MUSCLES['Rosca martelo'], 'Alternate_Hammer_Curl'),
            alt('Rosca martelo no cabo', 'Braquial e antebraços com tensão constante. Sinta a pegada neutra até o topo.', EXERCISE_MUSCLES['Rosca martelo'], 'Cable_Hammer_Curls_-_Rope_Attachment'),
            alt('Rosca martelo cruzada', 'Braquial e braquiorradial. Sinta a lateral do braço sem girar o punho.', EXERCISE_MUSCLES['Rosca martelo'], 'Cross_Body_Hammer_Curl')
        ],
        'Leg press': [
            alt('Hack squat', 'Quadríceps e glúteos. Sinta a frente da coxa empurrando sem tirar o quadril do apoio.', [muscle('quads'), muscle('glutes'), muscle('hamstrings', 'secondary')], 'Hack_Squat'),
            alt('Leg press pés fechados', 'Quadríceps com maior foco. Sinta a frente da coxa dominar o movimento.', [muscle('quads'), muscle('glutes', 'secondary')], 'Narrow_Stance_Leg_Press'),
            alt('Agachamento livre', 'Quadríceps, glúteos, posteriores e core. Sinta o corpo inteiro estável na descida.', EXERCISE_MUSCLES['Agachamento guiado'], 'Barbell_Full_Squat')
        ],
        'Agachamento guiado': [
            alt('Agachamento livre', 'Quadríceps, glúteos, posteriores e core. Sinta o pé inteiro no chão e o tronco firme.', EXERCISE_MUSCLES['Agachamento guiado'], 'Barbell_Full_Squat'),
            alt('Hack squat', 'Quadríceps e glúteos com trajetória guiada. Sinta as pernas empurrando sem perder alinhamento.', [muscle('quads'), muscle('glutes'), muscle('hamstrings', 'secondary')], 'Hack_Squat'),
            alt('Agachamento com peso corporal', 'Quadríceps e glúteos. Sinta controle, amplitude e joelhos alinhados.', [muscle('quads'), muscle('glutes'), muscle('core', 'secondary')], 'Bodyweight_Squat')
        ],
        'Mesa flexora': [
            alt('Flexora na bola', 'Posteriores de coxa e glúteos estabilizando. Sinta a parte de trás da perna puxar.', [muscle('hamstrings'), muscle('glutes', 'secondary'), muscle('core', 'secondary')], 'Ball_Leg_Curl'),
            alt('Stiff com barra', 'Posteriores, glúteos e lombar estabilizando. Sinta alongar atrás da coxa sem arredondar as costas.', [muscle('hamstrings'), muscle('glutes'), muscle('core', 'secondary')], 'Stiff-Legged_Barbell_Deadlift'),
            alt('Levantamento terra romeno', 'Posteriores e glúteos. Sinta o quadril indo para trás e a coxa alongando.', [muscle('hamstrings'), muscle('glutes'), muscle('core', 'secondary')], 'Romanian_Deadlift')
        ],
        'Stiff com halteres': [
            alt('Levantamento terra romeno', 'Posteriores e glúteos. Sinta o quadril indo para trás e a coxa alongando.', EXERCISE_MUSCLES['Stiff com halteres'], 'Romanian_Deadlift'),
            alt('Stiff com barra', 'Posteriores, glúteos e lombar estabilizando. Sinta alongar atrás da coxa sem arredondar as costas.', EXERCISE_MUSCLES['Stiff com halteres'], 'Stiff-Legged_Barbell_Deadlift'),
            alt('Stiff no Smith', 'Posteriores e glúteos com trajetória guiada. Sinta alongar atrás da coxa mantendo coluna neutra.', EXERCISE_MUSCLES['Stiff com halteres'], 'Smith_Machine_Stiff-Legged_Deadlift')
        ],
        'Cadeira extensora': [
            alt('Sissy squat com peso', 'Quadríceps em alta tensão. Sinta a frente da coxa controlar toda a amplitude.', EXERCISE_MUSCLES['Cadeira extensora'], 'Weighted_Sissy_Squat'),
            alt('Agachamento frontal', 'Quadríceps, glúteos e core. Sinta a frente da coxa com tronco mais vertical.', [muscle('quads'), muscle('glutes', 'secondary'), muscle('core', 'secondary')], 'Barbell_Full_Squat'),
            alt('Passada com halteres', 'Quadríceps e glúteos. Sinta a perna da frente empurrar o chão.', [muscle('quads'), muscle('glutes'), muscle('hamstrings', 'secondary')], 'Dumbbell_Lunges')
        ],
        'Panturrilha sentado': [
            alt('Panturrilha sentada unilateral', 'Sóleo e panturrilha baixa. Sinta subir e descer com pausa controlada.', EXERCISE_MUSCLES['Panturrilha sentado'], 'Dumbbell_Seated_One-Leg_Calf_Raise'),
            alt('Panturrilha no leg press', 'Panturrilhas com carga estável. Sinta o tornozelo fazer todo o movimento.', EXERCISE_MUSCLES['Panturrilha sentado'], 'Calf_Press_On_The_Leg_Press_Machine'),
            alt('Panturrilha sentada com barra', 'Sóleo e panturrilha. Sinta alongar embaixo e contrair no topo.', EXERCISE_MUSCLES['Panturrilha sentado'], 'Barbell_Seated_Calf_Raise')
        ],
        'Panturrilha em pé': [
            alt('Panturrilha no Smith', 'Gastrocnêmio e sóleo. Sinta a panturrilha subir sem dobrar os joelhos.', EXERCISE_MUSCLES['Panturrilha em pé'], 'Smith_Machine_Calf_Raise'),
            alt('Panturrilha no leg press', 'Panturrilhas com carga estável. Sinta o tornozelo fazer todo o movimento.', EXERCISE_MUSCLES['Panturrilha em pé'], 'Calf_Press_On_The_Leg_Press_Machine'),
            alt('Panturrilha unilateral com halter', 'Panturrilha com controle lado a lado. Sinta amplitude total em cada perna.', EXERCISE_MUSCLES['Panturrilha em pé'], 'Calf_Raise_On_A_Dumbbell')
        ],
        'Prancha': [
            alt('Abdominal máquina', 'Abdômen com resistência guiada. Sinta o tronco flexionar sem puxar com braços ou quadril.', EXERCISE_MUSCLES['Prancha'], 'Ab_Crunch_Machine'),
            alt('Crunch no cabo', 'Abdômen com tensão constante. Sinta as costelas aproximando do quadril com controle.', EXERCISE_MUSCLES['Prancha'], 'Cable_Crunch'),
            alt('Crunch reverso', 'Abdômen inferior e controle pélvico. Sinta o quadril enrolar sem embalar as pernas.', EXERCISE_MUSCLES['Prancha'], 'Reverse_Crunch')
        ],
        'Face pull': [
            alt('Posterior de ombro máquina', 'Deltoide posterior, romboides e trapézio médio. Sinta a parte de trás do ombro abrir o movimento.', EXERCISE_MUSCLES['Posterior de ombro'], 'Reverse_Machine_Flyes'),
            alt('Crucifixo inverso com halteres', 'Deltoide posterior e meio das costas. Sinta abrir os braços sem encolher o pescoço.', EXERCISE_MUSCLES['Face pull'], 'Reverse_Flyes'),
            alt('Elevação posterior deitado', 'Deltoide posterior com tronco apoiado. Sinta a parte de trás do ombro levantar a carga.', EXERCISE_MUSCLES['Face pull'], 'Dumbbell_Lying_Rear_Lateral_Raise')
        ],
        'Posterior de ombro': [
            alt('Face pull', 'Deltoide posterior, trapézio médio e rotadores. Sinta puxar para o rosto abrindo os cotovelos.', EXERCISE_MUSCLES['Posterior de ombro'], 'Face_Pull'),
            alt('Crucifixo inverso com halteres', 'Deltoide posterior e meio das costas. Sinta abrir os braços sem encolher o pescoço.', EXERCISE_MUSCLES['Posterior de ombro'], 'Reverse_Flyes'),
            alt('Elevação posterior deitado', 'Deltoide posterior com tronco apoiado. Sinta a parte de trás do ombro levantar a carga.', EXERCISE_MUSCLES['Posterior de ombro'], 'Dumbbell_Lying_Rear_Lateral_Raise')
        ],
        'Encolhimento': [
            alt('Encolhimento com barra', 'Trapézio superior. Sinta os ombros subirem retos e segure a contração no alto.', EXERCISE_MUSCLES['Encolhimento'], 'Barbell_Shrug'),
            alt('Encolhimento no cabo', 'Trapézio superior com tensão constante. Sinta subir e descer sem girar os ombros.', EXERCISE_MUSCLES['Encolhimento'], 'Cable_Shrugs'),
            alt('Encolhimento na máquina', 'Trapézio superior com trajetória estável. Sinta os ombros subirem sem dobrar os cotovelos.', EXERCISE_MUSCLES['Encolhimento'], 'Leverage_Shrug')
        ],
        'Supino inclinado': [
            alt('Supino inclinado halteres', 'Peitoral superior, ombro frontal e tríceps. Sinta a parte alta do peito alongar e contrair.', EXERCISE_MUSCLES['Supino inclinado halteres'], 'Incline_Dumbbell_Press'),
            alt('Supino inclinado barra', 'Peitoral superior, ombro frontal e tríceps. Sinta a parte alta do peito conduzir a subida.', EXERCISE_MUSCLES['Supino inclinado'], 'Barbell_Incline_Bench_Press_-_Medium_Grip'),
            alt('Crossover baixo', 'Peitoral superior em adução. Sinta as fibras altas aproximando os braços na frente do peito.', [muscle('upperChest'), muscle('frontShoulder', 'secondary')], 'Low_Cable_Crossover')
        ],
        'Supino máquina': [
            alt('Supino reto com barra', 'Peitoral médio, deltoide frontal e tríceps. Sinta o peito empurrando sem jogar tudo nos ombros.', EXERCISE_MUSCLES['Supino reto máquina ou barra'], 'Barbell_Bench_Press_-_Medium_Grip'),
            alt('Supino reto com halteres', 'Peitoral médio, ombro frontal e tríceps. Sinta o peito estabilizar e empurrar os halteres.', EXERCISE_MUSCLES['Supino máquina'], 'Dumbbell_Bench_Press'),
            alt('Supino no Smith', 'Peitoral com trajetória guiada. Sinta o peito empurrar mantendo escápulas firmes.', EXERCISE_MUSCLES['Supino máquina'], 'Smith_Machine_Bench_Press')
        ],
        'Crossover no cabo': [
            alt('Crucifixo máquina', 'Peitoral com foco em adução. Sinta o peito fechando o movimento, não os braços puxando.', EXERCISE_MUSCLES['Crucifixo máquina'], 'Butterfly'),
            alt('Crossover baixo', 'Peitoral superior em adução. Sinta as fibras altas aproximando os braços na frente do peito.', [muscle('upperChest'), muscle('frontShoulder', 'secondary')], 'Low_Cable_Crossover'),
            alt('Crossover unilateral', 'Peitoral com controle lado a lado. Sinta cada lado fechar o movimento sem girar o tronco.', EXERCISE_MUSCLES['Crossover no cabo'], 'Single-Arm_Cable_Crossover')
        ],
        'Tríceps francês': [
            alt('Tríceps testa no cabo', 'Tríceps com controle de cotovelos. Sinta o braço estender sem abrir para os lados.', EXERCISE_MUSCLES['Tríceps francês'], 'Cable_Lying_Triceps_Extension'),
            alt('Tríceps acima da cabeça na corda', 'Tríceps, principalmente cabeça longa. Sinta o alongamento atrás do braço.', EXERCISE_MUSCLES['Tríceps francês'], 'Cable_Rope_Overhead_Triceps_Extension'),
            alt('Tríceps unilateral com halter', 'Tríceps com foco lado a lado. Sinta o alongamento e estenda o cotovelo até o fim.', EXERCISE_MUSCLES['Tríceps francês'], 'Dumbbell_One-Arm_Triceps_Extension')
        ],
        'Crunch no chão': [
            alt('Crunch com mãos acima da cabeça', 'Reto abdominal com mais alavanca. Sinta o abdômen flexionar o tronco sem puxar o pescoço.', EXERCISE_MUSCLES['Crunch no chão'], 'Crunch_-_Hands_Overhead'),
            alt('Crunch oblíquo', 'Abdômen e oblíquos. Sinta a lateral do tronco aproximar costelas e quadril com controle.', [muscle('core')], 'Oblique_Crunches_-_On_The_Floor'),
            alt('Tuck crunch', 'Abdômen com joelhos e tronco aproximando juntos. Sinta a contração no centro do core.', EXERCISE_MUSCLES['Crunch no chão'], 'Tuck_Crunch')
        ],
        'Crunch reverso': [
            alt('Tuck crunch', 'Abdômen inferior e reto abdominal. Sinta o quadril enrolar sem jogar as pernas.', EXERCISE_MUSCLES['Crunch reverso'], 'Tuck_Crunch'),
            alt('Decline reverse crunch', 'Abdômen inferior com maior amplitude. Sinta a pelve subir sem embalar o corpo.', EXERCISE_MUSCLES['Crunch reverso'], 'Decline_Reverse_Crunch'),
            alt('Suspended reverse crunch', 'Core com maior demanda de estabilidade. Sinta o abdômen controlar a subida dos joelhos.', EXERCISE_MUSCLES['Crunch reverso'], 'Suspended_Reverse_Crunch')
        ],
        'Prancha lateral': [
            alt('Side bridge', 'Oblíquos e glúteo médio. Sinta a lateral do tronco sustentar o corpo alinhado.', EXERCISE_MUSCLES['Prancha lateral'], 'Side_Bridge'),
            alt('Side jackknife', 'Oblíquos com flexão lateral. Sinta a lateral do abdômen encurtar sem puxar o pescoço.', [muscle('core')], 'Side_Jackknife'),
            alt('Push up to side plank', 'Core, peitoral e ombros. Sinta o tronco estabilizar na rotação para a prancha lateral.', [muscle('core'), muscle('chest', 'secondary'), muscle('frontShoulder', 'secondary')], 'Push_Up_to_Side_Plank')
        ],
        'Mountain climber': [
            alt('Push up to side plank', 'Core, ombros e condicionamento. Sinta estabilidade no tronco durante a transição.', [muscle('core'), muscle('frontShoulder', 'secondary'), muscle('chest', 'secondary')], 'Push_Up_to_Side_Plank'),
            alt('Scissors jump', 'Cardio e pernas com troca rápida. Sinta aterrissagem leve e ritmo contínuo.', [muscle('quads'), muscle('calves'), muscle('core', 'secondary')], 'Scissors_Jump'),
            alt('Split jump', 'Cardio, quadríceps e glúteos. Sinta potência sem perder alinhamento dos joelhos.', [muscle('quads'), muscle('glutes'), muscle('calves', 'secondary')], 'Split_Jump')
        ],
        'Polichinelo': [
            alt('Star jump', 'Cardio geral com maior intensidade. Sinta saltos leves e braços coordenados.', EXERCISE_MUSCLES['Polichinelo'], 'Star_Jump'),
            alt('Side hop-sprint', 'Cardio lateral, panturrilhas e pernas. Sinta deslocamento rápido mantendo controle.', [muscle('calves'), muscle('quads'), muscle('core', 'secondary')], 'Side_Hop-Sprint'),
            alt('Rope jumping', 'Cardio e panturrilhas. Sinta saltos baixos e respiração estável.', EXERCISE_MUSCLES['Pular corda'], 'Rope_Jumping')
        ],
        'Pular corda': [
            alt('Polichinelo', 'Cardio geral sem equipamento. Sinta o ritmo subir com aterrissagem suave.', EXERCISE_MUSCLES['Polichinelo'], 'Star_Jump'),
            alt('Side to side box shuffle', 'Cardio lateral e coordenação. Sinta deslocamentos curtos e rápidos.', [muscle('calves'), muscle('quads'), muscle('core', 'secondary')], 'Side_to_Side_Box_Shuffle'),
            alt('Mountain climber', 'Core e cardio sem impacto vertical. Sinta o tronco firme enquanto alterna os joelhos.', EXERCISE_MUSCLES['Mountain climber'], 'Mountain_Climbers')
        ],
        'Agachamento com peso corporal': [
            alt('Agachamento na cadeira', 'Quadríceps e glúteos com referência de amplitude. Sinta sentar e levantar sem relaxar no apoio.', EXERCISE_MUSCLES['Agachamento com peso corporal'], 'Chair_Squat'),
            alt('Agachamento com salto', 'Pernas e cardio com explosão. Sinta aterrissagem macia e joelhos alinhados.', [muscle('quads'), muscle('glutes'), muscle('calves', 'secondary')], 'Freehand_Jump_Squat'),
            alt('Speed squats', 'Quadríceps, glúteos e condicionamento. Sinta repetições rápidas mantendo amplitude segura.', EXERCISE_MUSCLES['Agachamento com peso corporal'], 'Speed_Squats')
        ]
    };

    const loadSubstitutions = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    };

    const substitutions = loadSubstitutions();

    const saveSubstitutions = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(substitutions));
    };

    const getExerciseFrames = (item) => Array.from(item.querySelectorAll('.exercise-illustration img'))
        .map(img => img.getAttribute('src'))
        .filter(Boolean);

    const createMuscleFigure = (slug) => {
        const figure = document.createElement('span');
        figure.className = `muscle-figure muscle-${slug}`;
        figure.setAttribute('aria-hidden', 'true');
        figure.innerHTML = `
            <span class="muscle-body head"></span>
            <span class="muscle-body torso"></span>
            <span class="muscle-body arm arm-left"></span>
            <span class="muscle-body arm arm-right"></span>
            <span class="muscle-body leg leg-left"></span>
            <span class="muscle-body leg leg-right"></span>
            <span class="muscle-marker"></span>
        `;
        return figure;
    };

    const createMuscleStrip = (muscles = []) => {
        const strip = document.createElement('div');
        strip.className = 'muscle-strip';

        muscles.forEach(({ slug, role }) => {
            const badge = document.createElement('span');
            badge.className = `muscle-badge is-${role || 'primary'}`;
            badge.title = MUSCLE_LABELS[slug] || slug;

            const label = document.createElement('span');
            label.className = 'muscle-label';
            label.textContent = MUSCLE_LABELS[slug] || slug;

            badge.append(createMuscleFigure(slug), label);
            strip.appendChild(badge);
        });

        strip.setAttribute('aria-label', `Músculos trabalhados: ${muscles.map(({ slug }) => MUSCLE_LABELS[slug] || slug).join(', ')}`);
        return strip;
    };

    const updateMuscleStrip = (item, muscles) => {
        const info = item.querySelector('.exercise-info');
        if (!info) return;

        info.querySelector('.muscle-strip')?.remove();
        info.appendChild(createMuscleStrip(muscles));
    };

    const updateCardAria = (item) => {
        const exerciseName = item.querySelector('.exercise-name')?.textContent.trim() || 'exercício';
        const exerciseTarget = item.querySelector('.exercise-target')?.textContent.trim();
        item.setAttribute('aria-label', `Ver ilustração maior de ${exerciseName}${exerciseTarget ? `. ${exerciseTarget}` : ''}`);
    };

    const updateExerciseCard = (item, data) => {
        const name = item.querySelector('.exercise-name');
        const target = item.querySelector('.exercise-target');
        const illustrationImages = item.querySelectorAll('.exercise-illustration img');

        if (name) name.textContent = data.name;
        if (target) target.textContent = data.target;

        illustrationImages.forEach((img, index) => {
            if (data.frames?.[index]) {
                img.src = data.frames[index];
                img.alt = `${data.name} - imagem ${index + 1}`;
            }
        });

        item._currentData = {
            ...item._currentData,
            ...data,
            sets: item.querySelector('.exercise-sets')?.textContent.trim() || item._currentData?.sets || ''
        };

        updateMuscleStrip(item, item._currentData.muscles || []);
        updateCardAria(item);
    };

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(error => {
            console.warn('Service worker registration failed:', error);
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const workoutDays = document.querySelectorAll('.workout-day');
    workoutDays.forEach(day => observer.observe(day));

    const filterBtns = document.querySelectorAll('.day-btn');
    const mobileQuery = window.matchMedia('(max-width: 560px)');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

            const targetId = btn.getAttribute('data-target');
            let selectedDay = null;

            workoutDays.forEach(day => {
                day.classList.remove('visible');
                
                if (targetId === 'all') {
                    day.style.display = 'grid';
                    setTimeout(() => day.classList.add('visible'), 50);
                } else {
                    if (day.id === targetId) {
                        selectedDay = day;
                        day.style.display = 'grid';
                        setTimeout(() => day.classList.add('visible'), 50);
                    } else {
                        day.style.display = 'none';
                    }
                }
            });

            if (mobileQuery.matches) {
                const scrollTarget = selectedDay || document.querySelector('.workout-container');
                setTimeout(() => {
                    scrollTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 80);
            }
        });
    });

    setTimeout(() => {
        workoutDays.forEach((day, index) => {
            if (index < 2) day.classList.add('visible');
        });
    }, 300);

    const modal = document.createElement('div');
    modal.className = 'exercise-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="exercise-modal__backdrop" data-close-modal></div>
        <section class="exercise-modal__panel" role="dialog" aria-modal="true" aria-labelledby="exercise-modal-title">
            <button class="exercise-modal__close" type="button" aria-label="Fechar" data-close-modal>X</button>
            <div class="exercise-modal__header">
                <h2 id="exercise-modal-title"></h2>
                <span class="exercise-modal__sets"></span>
            </div>
            <p class="exercise-modal__target"></p>
            <div class="exercise-modal__muscles"></div>
            <div class="exercise-modal__swap">
                <h3>Substituições equivalentes</h3>
                <div class="exercise-modal__options"></div>
            </div>
            <div class="exercise-modal__images"></div>
        </section>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector('#exercise-modal-title');
    const modalSets = modal.querySelector('.exercise-modal__sets');
    const modalTarget = modal.querySelector('.exercise-modal__target');
    const modalMuscles = modal.querySelector('.exercise-modal__muscles');
    const modalOptions = modal.querySelector('.exercise-modal__options');
    const modalImages = modal.querySelector('.exercise-modal__images');
    const closeModalButton = modal.querySelector('.exercise-modal__close');

    const closeExerciseModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    const openExerciseModal = (item) => {
        const currentData = item._currentData;
        const name = currentData?.name || item.querySelector('.exercise-name')?.textContent.trim() || 'Exercício';
        const sets = currentData?.sets || item.querySelector('.exercise-sets')?.textContent.trim() || '';
        const target = currentData?.target || item.querySelector('.exercise-target')?.textContent.trim() || '';
        const frames = currentData?.frames || getExerciseFrames(item);
        const muscles = currentData?.muscles || [];

        if (!frames.length) return;

        modalTitle.textContent = name;
        modalSets.textContent = sets;
        modalTarget.textContent = target;
        modalTarget.hidden = !target;
        modalMuscles.innerHTML = '';
        modalMuscles.appendChild(createMuscleStrip(muscles));
        modalImages.innerHTML = '';
        modalOptions.innerHTML = '';

        const replacementOptions = [item._defaultData, ...(EXERCISE_ALTERNATIVES[item.dataset.defaultExercise] || [])];
        replacementOptions.forEach(option => {
            const button = document.createElement('button');
            const isCurrent = option.name === name;
            button.className = 'exercise-modal__option';
            button.type = 'button';
            button.disabled = isCurrent;

            button.innerHTML = `
                <span class="exercise-modal__option-name">${option.name}${isCurrent ? '<span class="exercise-modal__option-current">Atual</span>' : ''}</span>
                <span class="exercise-modal__option-target">${option.target}</span>
            `;

            if (isCurrent) {
                button.setAttribute('aria-current', 'true');
            }

            button.addEventListener('click', () => {
                updateExerciseCard(item, option);

                if (option.name === item._defaultData.name) {
                    delete substitutions[item.dataset.exerciseId];
                } else {
                    substitutions[item.dataset.exerciseId] = option;
                }

                saveSubstitutions();
                openExerciseModal(item);
            });

            modalOptions.appendChild(button);
        });

        frames.forEach((src, index) => {
            const figure = document.createElement('figure');
            figure.className = 'exercise-modal__figure';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `${name} - imagem ${index + 1}`;

            figure.appendChild(img);
            modalImages.appendChild(figure);
        });

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (!window.matchMedia('(pointer: coarse)').matches) {
            closeModalButton.focus();
        }
    };

    document.querySelectorAll('.exercise-item.has-illustration').forEach(item => {
        const dayId = item.closest('.workout-day')?.id || 'treino';
        const exerciseIndex = Array.from(document.querySelectorAll('.exercise-item.has-illustration')).indexOf(item);
        const exerciseName = item.querySelector('.exercise-name')?.textContent.trim() || 'exercício';
        const exerciseTarget = item.querySelector('.exercise-target')?.textContent.trim() || '';
        const exerciseSets = item.querySelector('.exercise-sets')?.textContent.trim() || '';

        item.dataset.exerciseId = `${dayId}-${exerciseIndex}`;
        item.dataset.defaultExercise = exerciseName;
        item._defaultData = {
            name: exerciseName,
            target: exerciseTarget,
            sets: exerciseSets,
            frames: getExerciseFrames(item),
            muscles: EXERCISE_MUSCLES[exerciseName] || []
        };
        item._currentData = item._defaultData;

        item.tabIndex = 0;
        item.setAttribute('role', 'button');
        updateExerciseCard(item, substitutions[item.dataset.exerciseId] || item._defaultData);

        item.addEventListener('click', () => openExerciseModal(item));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openExerciseModal(item);
            }
        });
    });

    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close-modal]')) {
            closeExerciseModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeExerciseModal();
        }
    });
});
